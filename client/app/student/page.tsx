"use client"

import Header from '@/components/Header';
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

    // Load students on page load
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

    // Add student
    const addStudentFrontend = async (studentData: { name: string; rollNo: string }) => {
        try {
            const newStudent = await createStudent(studentData);
            setStudents(prev => [...prev, newStudent]);
        } catch (error) {
            console.error("Failed to create student", error);
        }
    }

    // Update student in frontend
    const updateStudentFrontend = (studentId: number, updatedData: { name: string; rollNo: string }) => {
        setStudents(prev =>
            prev.map(s => s.studentId === studentId ? { ...s, ...updatedData } : s)
        );
    };

    // Open Add modal
    const openAddModal = () => {
        setCurrentStudent(null);
        setFormData({ name: "", rollNo: "" });
        setIsModalOpen(true);
    };

    // Open Edit modal
    const openEditModal = (student: Student) => {
        setCurrentStudent(student);
        setFormData({ name: student.name, rollNo: student.rollNo });
        setIsModalOpen(true);
    };

    // Handle form submit
    const handleSubmit = () => {
        // Validation
        if (!formData.name.trim() || !formData.rollNo.trim()) {
            alert("Please fill in both Name and Roll No.");
            return;
        }

        if (currentStudent) {
            // Update frontend
            updateStudentFrontend(currentStudent.studentId, formData);

            // Update backend
            updateStudentApi(currentStudent.studentId, formData);
        } else {
            // Add frontend + backend
            addStudentFrontend(formData);
        }

        setIsModalOpen(false);
    };

    // Delete student
    const handleDelete = async (id: number) => {
        await deleteStudent(id);
        loadStudents();
    };

    return (
        <div className="flex">
            <Sidebar />

            <div className="flex-1 ml-70 flex flex-col min-h-screen">
                {/* Header */}
                <Header />

                {/* Main content */}
                <main className="flex-1 bg-gray-100 p-6 overflow-auto">
                    <div className='flex justify-between items-center px-3 mb-6'>
                        <h1 className="text-2xl font-semibold">Students</h1>
                        <button
                            onClick={openAddModal}
                            className='bg-green-500 px-4 py-2 rounded-md text-white font-semibold hover:bg-green-600 transition'>
                            Add
                        </button>
                    </div>

                    {/* Students Table */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="grid grid-cols-3 font-semibold bg-gray-300 px-6 py-3">
                            <span>Name</span>
                            <span>Roll No</span>
                            <span className="text-center">Actions</span>
                        </div>

                        {students.map(student => (
                            <div
                                key={student.studentId}
                                className="grid grid-cols-3 items-center px-6 py-2 hover:bg-gray-50 border-t border-t-gray-300"
                            >
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
                        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
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
