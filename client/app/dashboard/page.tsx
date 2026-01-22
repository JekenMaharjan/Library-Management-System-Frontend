import Sidebar from '@/components/Sidebar'
import React from 'react'

const DashboardPage = () => {
    return (
        <div className="flex">
            {/* Sidebar (fixed) */}
            <Sidebar />

            {/* Main content area */}
            <div className="flex-1 ml-70 flex flex-col min-h-screen">

                {/* Topbar / Header */}
                <header className="flex justify-between items-center bg-white shadow-md p-4 h-20 border-b-2 border-b-gray-300">
                    <h1 className="flex gap-10 text-center font-extrabold text-2xl sm:text-3xl tracking-wide">
                        <span className="text-orange-900 block drop-shadow-md">Library</span>
                        <span className="text-orange-700 block drop-shadow-md">Management</span>
                        <span className="text-orange-600 block drop-shadow-md">System</span>
                    </h1>
                </header>

                {/* Page content */}
                <main className="flex-1 bg-gray-100 p-6 overflow-auto">
                    
                </main>
            </div>
        </div>
    )
}

export default DashboardPage
