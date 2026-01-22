"use client"

import Sidebar from '@/components/Sidebar'
import { deleteBook, deleteStudent, getBooks, getStudents } from '@/lib/api';
import React, { useEffect, useState } from 'react'

type Book = {
    bookId: number;
    title: string;
    author: string;
    totalStock: number;
};

const StudentPage = () => {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = async () => {
        try {
            const data = await getBooks();
            setBooks(data);
        }
        catch (error) {
            console.error("Failed to fetch students", error);
        }
    };

    const handleDelete = async (id: number) => {
        await deleteBook(id);
        loadBooks(); // refresh list
    };

    return (
        <div className="flex">
            {/* Sidebar (fixed) */}
            <Sidebar />

            {/* Main content area */}
            <div className="flex-1 ml-70 flex flex-col min-h-screen">

                {/* Topbar / Header */}
                <header className="flex justify-between items-center bg-white shadow-md p-4 h-20 border-b-2 border-b-gray-300">
                    <h1 className="text-2xl font-bold font-serif">Welcome to the Library Management System!</h1>
                </header>

                {/* Page content */}
                <main className="flex-1 bg-gray-100 p-6 overflow-auto">
                    <h1 className="text-2xl font-semibold mb-6">Students</h1>

                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        {/* Header */}
                        <div className="grid grid-cols-4 font-semibold bg-gray-300 px-6 py-3">
                            <span>Title</span>
                            <span>Author</span>
                            <span>Total Stock</span>
                            <span className="text-center">Actions</span>
                        </div>

                        {/* Row */}
                        {books.map((book) => (
                            <div
                                key={book.bookId}
                                className="grid grid-cols-4 font-mono items-center px-6 py-2 hover:bg-gray-50 border-t border-t-gray-300">
                                <p>{book.title}</p>
                                <p>{book.author}</p>
                                <p>{book.totalStock}</p>

                                <div className="flex font-semibold justify-center gap-3">
                                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm">
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
                </main>
            </div>
        </div>
    )
}

export default StudentPage
