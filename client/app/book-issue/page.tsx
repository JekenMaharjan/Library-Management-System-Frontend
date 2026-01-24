"use client"

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar'
import { bookReserve, deleteIssue, getBooks, getIssueBooks, getStudents, returnReserve, searchBooks, searchIssueBooks } from '@/lib/api';
import React, { useEffect, useState } from 'react'
import { IoMdSearch } from 'react-icons/io';
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";

type Student = {
    studentId: number;
    name: string;
    rollNo: string;
};

type Book = {
    bookId: number;
    title: string;
    author: string;
    totalStock: number;
};

type IssueBook = {
    issueId: number;
    bookTitle: string;
    studentName: string;
    issueDate: string;
    returnDate: string | null;
    isReturned: boolean;
};

const BookIssuePage = () => {
    const [issueBooks, setIssueBooks] = useState<IssueBook[]>([]);
    const [books, setBooks] = useState<Book[]>([]);
    const [students, setStudents] = useState<Student[]>([]);

    const [searchQuery, setSearchQuery] = useState("");
    const [searchIssueQuery, setSearchIssueQuery] = useState("");

    const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
    
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [studentRollInput, setStudentRollInput] = useState("");

    // ==================================================================

    // Load IssuedBooks, Books and Students data from API in first load
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery.trim() || searchIssueQuery.trim()) {
                handleIssuedSearch();
                handleAvaBooksSearch();
            } 
            else {
                loadIssueBooks();
                loadBooks();
                loadStudents(); // empty search → show all
            }
        }, 400); // 300–500ms is standard
        return () => clearTimeout(timer);
    }, [searchQuery, searchIssueQuery]);

    // ===================================================================================

    // Load IssuedBooks data
    const loadIssueBooks = async () => {
        try {
            const data = await getIssueBooks();
            setIssueBooks(data);
        } catch (error) {
            console.error("Failed to fetch Books", error);
        }
    };

    // ===================================================================================

    // Load Books data
    const loadBooks = async () => {
        try {
            const data = await getBooks();

            // show only available books
            const availableBooks = data.filter(
                (book: Book) => book.totalStock > 0
            );

            setBooks(availableBooks);
        } catch (error) {
            console.error("Failed to fetch Books", error);
        }
    };

    // ===================================================================================

    // Load Students data
    const loadStudents = async () => {
            try {
                const data = await getStudents(); 
                setStudents(data);
            } catch (error) {
                console.error("Failed to fetch students", error);
            }
        };

    // ==================================================================

    // Format Date
    const formatDate = (date?: string | null) =>
        date ? new Date(date).toLocaleDateString() : "\u2014";

    // Format Status
    const formatStatus = (value?: boolean) =>
        value === true ? <FaCheck className='text-green-500' /> : <ImCross className='text-red-500' />;

    // ==================================================================

    // Search available books by title
    const handleAvaBooksSearch = async () => {
        try {
            if (!searchQuery.trim()) {
                loadBooks();
                return;
            }

            const data = await searchBooks(searchQuery);

            // show only books with stock > 0
            const availableBooks = data.filter(
                (book: Book) => book.totalStock > 0
            );

            setBooks(availableBooks);
        } catch (error) {
            console.error("Search failed", error);
        }
    };

    // ==================================================================

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

    // ==================================================================

    // Reserve Book Pop UP Container
    const handleReserveBook = (book: Book) => {
        setSelectedBook(book);
        setIsReserveModalOpen(true);
    };

    // ==================================================================
    
    // Confirm Reserve Book
    const confirmReserveBook = async () => {
        if (!selectedBook) return alert("Please select a book");
        if (!studentRollInput.trim()) return alert("Please enter student roll number");

        const student = students.find(
            s => s.rollNo.trim().toLowerCase() === studentRollInput.trim().toLowerCase()
        );
        if (!student) return alert("Student not found");

        try {
            await bookReserve({
                bookId: selectedBook.bookId,
                studentId: student.studentId,
            });

            alert("Book reserved successfully");

            setIsReserveModalOpen(false);
            setStudentRollInput("");
            setSelectedBook(null);

            await Promise.all([loadBooks(), loadIssueBooks()]);
        } catch {
            alert("Failed to reserve book");
        }
    };

    // ==================================================================

    const handleReturnBook = async (issueId: number) => {
        try {
            await returnReserve({ issueId });
            alert("Book returned successfully");

            // reload data
            await loadBooks();
            await loadIssueBooks();
        } catch {
            alert("Failed to return book");
        }
    };

    // ==================================================================

    const handleDelete = async (issueId: number) => {
        try {
            await deleteIssue({ issueId });
            // alert("Issued Book deleted successfully");

            // reload data
            await loadBooks();
            await loadIssueBooks();
        } catch {
            alert("Failed to delete issued book");
        }
    };

    // ===================================================================================

    return (
        <div className="flex">
            <Sidebar />

            <div className="flex-1 ml-70 flex flex-col min-h-screen">
                {/* Header */}
                <Header />

                {/* Main Content */}
                <main className="flex-1 p-6 overflow-auto">
                    {/* Book Circulation */}
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
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleIssuedSearch();
                                        }
                                    }}
                                />
                                <button
                                    onClick={handleIssuedSearch}
                                    className='hover:bg-gray-100 rounded-r-xl w-full h-full px-4'>
                                    <IoMdSearch size={29} />
                                </button>

                            </span>
                        </div>
                    </div>

                    {/* ============================================================================================================ */}

                    {/* Issued Books Table */}
                    <div className="bg-white border-2 border-orange-200 rounded-lg shadow overflow-hidden mb-10">
                        <div className="grid grid-cols-6 place-items-center font-semibold bg-orange-200 px-6 py-2">
                            <span>Book</span>
                            <span>Student</span>
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

                                    <div className="flex font-semibold justify-center gap-5 py-2">
                                        {issueBook.isReturned ? 
                                            <button
                                                onClick={() => handleDelete(issueBook.issueId)}>
                                                <IoTrashBin className='text-orange-400' />
                                            </button>
                                        :
                                            <button
                                                onClick={() => handleReturnBook(issueBook.issueId)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md text-sm">
                                                Return Book
                                            </button>
                                        }
                                        
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* ============================================================================================================ */}

                    {/* Thicker solid bar */}
                    {/* <hr className="my-7 h-1 bg-orange-400 border-0" /> */}

                    {/* Available Books */}
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
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleAvaBooksSearch();
                                        }
                                    }}
                                />
                                <button
                                    onClick={handleAvaBooksSearch}
                                    className='hover:bg-gray-100 rounded-r-xl w-full h-full px-4'>
                                    <IoMdSearch size={29} />
                                </button>
                            </span>
                        </div>
                    </div>

                    {/* ============================================================================================================ */}

                    {/* Available Books Table*/}
                    <div className="bg-white border-2 border-orange-200 rounded-lg shadow-md overflow-hidden">
                        <div className="grid grid-cols-4 place-items-center font-semibold bg-orange-200 px-6 py-2">
                            <span>Book</span>
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
                                            onClick={() => handleReserveBook(book)}
                                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md text-sm">
                                            Reserve Book
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* ============================================================================================================ */}

                    {/* Modal for Reserve and Return Books */}
                    {isReserveModalOpen && selectedBook && (
                        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
                            <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                                <h2 className="text-xl font-semibold mb-4 text-orange-600">
                                    Reserve Book
                                </h2>

                                {/* Book details (read-only) */}
                                <div className="mb-4 space-y-2 text-sm">
                                    <p><strong>Title:</strong> {selectedBook.title}</p>
                                    <p><strong>Author:</strong> {selectedBook.author}</p>
                                    <p><strong>Available Stock:</strong> {selectedBook.totalStock}</p>
                                </div>

                                {/* Student input */}
                                <input
                                    type="text"
                                    placeholder="Enter Student Roll No.."
                                    className="border px-3 py-2 rounded-md w-full mb-4"
                                    value={studentRollInput}
                                    onChange={(e) => setStudentRollInput(e.target.value)}
                                />

                                {/* Actions */}
                                <div className="flex justify-end gap-3">
                                    <button
                                        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
                                        onClick={() => setIsReserveModalOpen(false)}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
                                        onClick={confirmReserveBook}
                                    >
                                        Confirm Reserve
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

export default BookIssuePage
