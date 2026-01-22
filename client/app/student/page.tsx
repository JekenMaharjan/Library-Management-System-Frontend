"use client"

import Sidebar from '@/components/Sidebar'
import { deleteStudent, getStudents } from '@/lib/api';
import React, { useEffect, useState } from 'react'

type Student = {
    studentId: number;
    name: string;
    rollNo: string;
};

const StudentPage = () => {
    const [students, setStudents] = useState<Student[]>([]);

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {
        try {
            const data = await getStudents();
            setStudents(data);
        }
        catch (error) {
            console.error("Failed to fetch students", error);
        }
    };

    const handleDelete = async (id: number) => {
        await deleteStudent(id);
        loadStudents(); // refresh list
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
                        <div className="grid grid-cols-3 font-semibold bg-gray-300 px-6 py-3">
                            <span>Name</span>
                            <span>Roll No</span>
                            <span className="text-center">Actions</span>
                        </div>

                        {/* Row */}
                        {students.map((student) => (
                            <div
                                key={student.studentId}
                                className="grid grid-cols-3 font-mono items-center px-6 py-2 hover:bg-gray-50 border-t border-t-gray-300">
                                <p>{student.name}</p>
                                <p>{student.rollNo}</p>

                                <div className="flex font-semibold justify-center gap-3">
                                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm">
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(student.studentId)}
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
