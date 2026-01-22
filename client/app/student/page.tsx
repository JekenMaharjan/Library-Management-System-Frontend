import Sidebar from '@/components/Sidebar'
import React from 'react'

const StudentPage = () => {
    
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
                        <div className="grid grid-cols-3 items-center px-6 py-3 hover:bg-gray-50">
                            <span>Jeken Maharjan</span>
                            <span>Kan077bct040</span>

                            <div className="flex justify-center gap-3">
                                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md text-sm">
                                    Edit
                                </button>
                                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md text-sm">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default StudentPage
