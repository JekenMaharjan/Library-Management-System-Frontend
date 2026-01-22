"use client"

import Sidebar from '@/components/Sidebar'
import { createStudent, deleteStudent, getStudents, updateStudentApi } from '@/lib/api';
import React, { useEffect, useState } from 'react'

type Student = {
    studentId: number;
    name: string;
    rollNo: string;
};

const StudentPage = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
    const [formData, setFormData] = useState({ name: "", rollNo: "" });

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {
        try {
            const data = await getStudents();
            setStudents(data);
        } catch (error) {
            console.error("Failed to fetch students", error);
        }
    };

    const addStudent = async (studentData: { name: string; rollNo: string}) => {
        // Simple validation
        if (!studentData.name.trim() || !studentData.rollNo.trim()) {
            alert("Please fill in both Name and Roll No.");
            return; // stop execution if invalid
        }

        try {
            const newStudent = await createStudent(studentData); // call your API
            setStudents(prev => [...prev, newStudent]); // add to state
        } catch (error) {
            console.error("Failed to add student:", error);
        }
    }

    const updateStudent = async (studentId: number, updatedData: { name?: string; rollNo?: string }) => {
        if (!updatedData.name?.trim() || !updatedData.rollNo?.trim()) {
            alert("Please fill in both Name and Roll No.");
            return;
        }
        
        try {
            const updatedStudent = await updateStudentApi(studentId, updatedData); // call your API
            setStudents(prev => prev.map(s => (s.studentId === studentId ? updatedStudent : s))); // update state
        } catch (error) {
            console.log("Failed to update student:", error);
        }
    }

    const handleDelete = async (studentId: number) => {
        await deleteStudent(studentId);
        loadStudents(); // refresh list
    };

    const openAddModal = () => {
        setCurrentStudent(null);
        setFormData({ name: "", rollNo: "" });
        setIsModalOpen(true);
    };

    const openEditModal = (student: Student) => {
        setCurrentStudent(student);
        setFormData({ name: student.name, rollNo: student.rollNo });
        setIsModalOpen(true);
    };

    const handleSubmit = () => {
        if (currentStudent) {
            updateStudent(currentStudent.studentId, formData);
        } else {
            addStudent(formData);
        }
        setIsModalOpen(false);
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
                    <div className='flex justify-between px-2 items-center mb-6'>
                        <h1 className="text-2xl font-semibold">Students</h1>
                        <button 
                        onClick={() => openAddModal()}
                        className='bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md font-semibold'>
                            Add
                        </button>
                    </div>

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
                                className="grid grid-cols-3 items-center px-6 py-2 hover:bg-gray-50 border-t border-t-gray-300">
                                <p className='font-mono'>{student.name}</p>
                                <p className='font-mono'>{student.rollNo}</p>

                                <div className="flex font-semibold justify-center gap-3">
                                    <button 
                                        onClick={() => openEditModal(student)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
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

                    {/* Modal */}
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition duration-300 flex justify-center items-center z-50">
                            <div className="bg-white rounded-lg shadow-lg w-80 p-6">
                                <h2 className="text-xl font-semibold mb-4">
                                    {currentStudent ? "Edit Student" : "Add Student"}
                                </h2>

                                <div className="flex flex-col gap-3">
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        className="border px-3 py-2 rounded-md w-full"
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Roll No"
                                        className="border px-3 py-2 rounded-md w-full"
                                        value={formData.rollNo}
                                        onChange={(e) => setFormData(prev => ({ ...prev, rollNo: e.target.value }))}
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
                                        {currentStudent ? "Update" : "Add"}
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

export default StudentPage
