"use client"

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar'
import { createBook, deleteBook, getBooks, updateBook } from '@/lib/api';
import React, { useEffect, useState } from 'react'

type Book = {
    bookId: number;
    title: string;
    author: string;
    totalStock: number;
};

const BookPage = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentBook, setCurrentBook] = useState<Book | null>(null);
    const [formData, setFormData] = useState({ title: "", author: "", totalStock: "" });

    // Load books from API
    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = async () => {
        try {
            const data = await getBooks();
            setBooks(data);
        } catch (error) {
            console.error("Failed to fetch Books", error);
        }
    };

    // Add new book
    const addBookFrontend = async (bookData: { title: string; author: string; totalStock: number }) => {
        try {
            const newBook = await createBook(bookData);
            setBooks(prev => [...prev, newBook]);
        } catch (error) {
            console.error("Failed to create book", error);
        }
    }

    // Update book frontend
    const updateBookFrontend = (bookId: number, updatedData: { title?: string; author?: string; totalStock?: string }) => {
        const updatedBook = {
            bookId,
            title: updatedData.title || "",
            author: updatedData.author || "",
            totalStock: updatedData.totalStock ? Number(updatedData.totalStock) : 0,
        };

        setBooks(prevBooks =>
            prevBooks.map(b => (b.bookId === bookId ? updatedBook : b))
        );
    };

    // Open Add Modal
    const openAddModal = () => {
        setCurrentBook(null);
        setFormData({ title: "", author: "", totalStock: "" });
        setIsModalOpen(true);
    };

    // Open Edit Modal
    const openEditModal = (book: Book) => {
        setCurrentBook(book);
        setFormData({
            title: book.title,
            author: book.author,
            totalStock: book.totalStock.toString()
        });
        setIsModalOpen(true);
    };

    // Handle form submit
    const handleSubmit = () => {
        // Validation
        if (!formData.title.trim() || !formData.author.trim() || !formData.totalStock.trim()) {
            alert("Please fill all fields");
            return;
        }

        if (currentBook) {
            // Update frontend
            updateBookFrontend(currentBook.bookId, formData);

            // Update backend
            updateBook(currentBook.bookId, {
                title: formData.title,
                author: formData.author,
                totalStock: Number(formData.totalStock),
            });
        } else {
            // Add frontend + backend
            addBookFrontend({
                title: formData.title,
                author: formData.author,
                totalStock: Number(formData.totalStock),
            });
        }

        setIsModalOpen(false);
    };

    // Delete book
    const handleDelete = async (id: number) => {
        await deleteBook(id);
        loadBooks();
    };

    return (
        <div className="flex">
            <Sidebar />

            <div className="flex-1 ml-70 flex flex-col min-h-screen">
                {/* Header */}
                <Header />

                {/* Main Content */}
                <main className="flex-1 bg-gray-100 p-6 overflow-auto">
                    <div className='flex justify-between items-center px-3 mb-6'>
                        <h1 className="text-2xl font-semibold">Books</h1>
                        <button
                            onClick={openAddModal}
                            className='bg-green-500 px-4 py-2 rounded-md text-white font-semibold hover:bg-green-600 transition'>
                            Add
                        </button>
                    </div>

                    {/* Books Table */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="grid grid-cols-4 font-semibold bg-gray-300 px-6 py-3">
                            <span>Title</span>
                            <span>Author</span>
                            <span>Total Stock</span>
                            <span className="text-center">Actions</span>
                        </div>

                        {books.map((book) => (
                            <div
                                key={book.bookId}
                                className="grid grid-cols-4 items-center px-6 py-2 hover:bg-gray-50 border-t border-t-gray-300"
                            >
                                <p className='font-mono'>{book.title}</p>
                                <p className='font-mono'>{book.author}</p>
                                <p className='font-mono'>{book.totalStock}</p>

                                <div className="flex font-semibold justify-center gap-3">
                                    <button
                                        onClick={() => openEditModal(book)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(book.bookId)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Modal */}
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
                            <div className="bg-white rounded-lg shadow-lg w-80 p-6">
                                <h2 className="text-xl font-semibold mb-4">
                                    {currentBook ? "Edit Book" : "Add Book"}
                                </h2>

                                <div className="flex flex-col gap-3">
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        className="border px-3 py-2 rounded-md w-full"
                                        value={formData.title}
                                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Author"
                                        className="border px-3 py-2 rounded-md w-full"
                                        value={formData.author}
                                        onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Total Stock"
                                        className="border px-3 py-2 rounded-md w-full"
                                        value={formData.totalStock}
                                        onChange={(e) => setFormData(prev => ({ ...prev, totalStock: e.target.value }))}
                                    />
                                </div>

                                <div className="flex justify-end gap-3 mt-4">
                                    <button
                                        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
                                        onClick={() => setIsModalOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
                                        onClick={handleSubmit} 
                                    >
                                        {currentBook ? "Update" : "Add"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </main>
            </div>
        </div>
    )
}

export default BookPage
