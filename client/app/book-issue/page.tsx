import Header from '@/components/Header'
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
                <Header />

                {/* Page content */}
                <main className="flex-1 bg-gray-100 p-6 overflow-auto">

                </main>
            </div>
        </div>
    )
}

export default BookIssuePage
