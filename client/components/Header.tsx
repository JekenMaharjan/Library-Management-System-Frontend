import React from 'react'

const Header = () => {
    return (
        <div>
            {/* Topbar / Header */}
            <header className="flex justify-center items-center bg-gradient-to-r from-orange-200 via-orange-100 to-orange-50 shadow-lg p-4 h-24 border-b-2 border-orange-300 rounded-b-lg">
                <h1 className="flex flex-col sm:flex-row justify-center gap-4 text-center font-extrabold text-2xl sm:text-3xl tracking-wide">
                    <span className="text-orange-900 drop-shadow-md border-b-4 border-orange-400 pb-1">Library</span>
                    <span className="text-orange-700 drop-shadow-md border-b-4 border-orange-300 pb-1">Management</span>
                    <span className="text-orange-600 drop-shadow-md border-b-4 border-orange-200 pb-1">System</span>
                </h1>
            </header>
        </div>
    )
}

export default Header