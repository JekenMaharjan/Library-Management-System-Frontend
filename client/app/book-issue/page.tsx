"use client"

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar'
import { getBooks, getIssueBooks, searchBooks, searchIssueBooks } from '@/lib/api';
import React, { useEffect, useState } from 'react'
import { IoMdSearch } from 'react-icons/io';
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";

type IssueBook = {
    issueId: number;
    bookTitle: string;
    studentName: string;
    issueDate: string;
    returnDate: string | null;
    isReturned: boolean;
};

type Book = {
    bookId: number;
    title: string;
    author: string;
    totalStock: number;
};

const BookIssuePage = () => {
    const [issueBooks, setIssueBooks] = useState<IssueBook[]>([]);
    const [books, setBooks] = useState<Book[]>([]);
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const [currentBook, setCurrentBook] = useState<Book | null>(null);
    // const [formData, setFormData] = useState({ title: "", author: "", totalStock: "" });
    const [searchQuery, setSearchQuery] = useState("");
    const [searchIssueQuery, setSearchIssueQuery] = useState("");

    // Load IssuedBooks from API
    useEffect(() => {
        loadIssueBooks();
        loadBooks();
    }, []);

    const loadIssueBooks = async () => {
        try {
            const data = await getIssueBooks();
            setIssueBooks(data);
        } catch (error) {
            console.error("Failed to fetch Books", error);
        }
    };

    const loadBooks = async () => {
            try {
                const data = await getBooks();
                setBooks(data);
            } catch (error) {
                console.error("Failed to fetch Books", error);
            }
        };

    const formatDate = (date?: string | null) =>
        date ? new Date(date).toLocaleDateString() : "\u2014";

    const formatStatus = (value?: boolean) => 
        value === true ? <FaCheck className='text-green-500' /> : <ImCross className='text-red-500' />;

    // Search available books by title
    const handleAvaBooksSearch = async () => {
        try {
            if (!searchQuery.trim()) {
                loadBooks(); // show all books if search is empty
                return;
            }
            const data = await searchBooks(searchQuery); // search by rollNo
            setBooks(data);
        } catch (error) {
            console.error("Search failed", error);
        }
    };

    // Search issued books by title
    const handleIssuedSearch = async () => {
        try {
            if (!searchIssueQuery.trim()) {
                loadIssueBooks(); // show all issuedBooks if search is empty
                return;
            }
            const data = await searchIssueBooks(searchIssueQuery); // search by title
            setIssueBooks(data);
        } catch (error) {
            console.error("Search failed", error);
        }
    };

    /*
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

    
    */

    return (
        <div className="flex">
            <Sidebar />

            <div className="flex-1 ml-70 flex flex-col min-h-screen">
                {/* Header */}
                <Header />

                {/* Main Content */}
                <main className="flex-1 p-6 overflow-auto">
                    <div className='flex justify-between items-center px-3 mb-5'>
                        <h1 className="text-3xl text-orange-600 font-semibold">Book Circulation</h1>
                        <div className='flex h-10'>
                            <span className='flex items-center border rounded-xl'>
                                <input
                                    type="text"
                                    placeholder="Search by Title..."
                                    className="border-r border-gray-400 text-sm focus:outline-0 rounded-l-xl px-3 py-2"
                                    value={searchIssueQuery}
                                    onChange={(a) => setSearchIssueQuery(a.target.value)}
                                />
                                <button
                                    onClick={handleIssuedSearch}
                                    className='hover:bg-gray-100 rounded-r-xl w-full h-full px-4'>
                                        <IoMdSearch size={29} />
                                </button>

                            </span>
                        </div>
                    </div>

                    {/* Issued Books Table */}
                    <div className="bg-white border-2 border-orange-200 rounded-lg shadow overflow-hidden mb-10">
                        <div className="grid grid-cols-6 place-items-center font-semibold bg-orange-200 px-6 py-2">
                            <span>Title</span>
                            <span>Name</span>
                            <span>Issue Date</span>
                            <span>Return Date</span>
                            <span>Return Status</span>
                            <span>Action</span>
                        </div>

                        {issueBooks.length === 0 ? (
                            <p className='p-4 text-center text-sm text-gray-500'>No Books Found...</p>
                        ) : (
                            issueBooks.map(issueBook => (
                                <div
                                    key={issueBook.issueId}
                                    className="grid grid-cols-6 place-items-center px-6 hover:bg-gray-50 border-t border-t-gray-300"
                                >
                                    <p className='font-mono text-sm'>{issueBook.bookTitle}</p>
                                    <p className='font-mono text-sm'>{issueBook.studentName}</p>
                                    <p className="font-mono text-sm">{formatDate(issueBook.issueDate)}</p>
                                    <p className="font-mono text-sm">{issueBook.returnDate ? formatDate(issueBook.returnDate) : "-"}</p>
                                    <p className='font-mono text-sm'>{formatStatus(issueBook.isReturned)}</p>

                                    <div className="flex font-semibold justify-center gap-3 py-2">
                                        <button
                                            // onClick={}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md text-sm">
                                            Return Book
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Thicker solid bar */}
                    {/* <hr className="my-7 h-1 bg-orange-400 border-0" /> */}

                    {/* Books Table */}
                    <div className='flex justify-between items-center px-3 mb-5'>
                        <h1 className="text-3xl text-orange-600 font-semibold">Available Book</h1>
                        <div className='flex h-10'>
                            <span className='flex items-center border rounded-xl'>
                                <input
                                    type="text"
                                    placeholder="Search by Title..."
                                    className="border-r border-gray-400 text-sm focus:outline-0 rounded-l-xl px-3 py-2"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button 
                                    onClick={handleAvaBooksSearch}
                                    className='hover:bg-gray-100 rounded-r-xl w-full h-full px-4'>
                                    <IoMdSearch size={29} />
                                </button>
                            </span>
                        </div>
                    </div>
                    
                    {/* Available Books */}
                    <div className="bg-white border-2 border-orange-200 rounded-lg shadow-md overflow-hidden">
                        <div className="grid grid-cols-4 place-items-center font-semibold bg-orange-200 px-6 py-2">
                            <span>Title</span>
                            <span>Author</span>
                            <span>Stock</span>
                            <span>Action</span>
                        </div>

                        {books.length === 0 ? (
                            <p className='p-4 text-center text-sm text-gray-500'>No Books Found...</p>
                        ) : ( 
                            books.map((book) => (
                                <div
                                    key={book.bookId}
                                    className="grid grid-cols-4 place-items-center px-6 hover:bg-gray-50 border-t border-t-gray-300"
                                >
                                    <p className='font-mono text-sm'>{book.title}</p>
                                    <p className='font-mono text-sm'>{book.author}</p>
                                    <p className='font-mono text-sm'>{book.totalStock}</p>

                                    <div className="flex font-semibold justify-center gap-3 py-2">
                                        <button
                                            // onClick={}
                                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md text-sm">
                                            Reserve Book
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Modal
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
                    )} */}

                </main>
            </div>
        </div>
    )
}

export default BookIssuePage
