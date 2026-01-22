import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import React from 'react'

const DashboardPage = () => {
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar (fixed) */}
            <Sidebar />

            {/* Main content area */}
            <div className="flex-1 flex flex-col ml-70 min-h-screen">
                {/* Header / Top Title */}
                <Header />

                {/* Page content */}
                <main className="flex-1 p-6 overflow-auto space-y-6">
                    {/* Example content boxes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                            <h2 className="font-semibold text-lg text-gray-800">Analytics</h2>
                            <p className="text-gray-600 mt-2">Some analytics content here.</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                            <h2 className="font-semibold text-lg text-gray-800">Users</h2>
                            <p className="text-gray-600 mt-2">Some user stats here.</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                            <h2 className="font-semibold text-lg text-gray-800">Reports</h2>
                            <p className="text-gray-600 mt-2">Reports content here.</p>
                        </div>
                    </div>

                    {/* More content sections */}
                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                        <h2 className="font-semibold text-lg text-gray-800">Recent Activity</h2>
                        <p className="text-gray-600 mt-2">Track recent user or book activity here.</p>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default DashboardPage
