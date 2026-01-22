import Sidebar from '@/components/Sidebar'
import React from 'react'

const BookIssuePage = () => {
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

                </main>
            </div>
        </div>
    )
}

export default BookIssuePage
