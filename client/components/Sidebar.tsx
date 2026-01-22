import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
    return (
        <div className='flex flex-col justify-around border-r-2 border-r-gray-300 fixed left-0 top-0 lg:w-70 h-screen'>
            {/* Total Sections: 3 */}

            {/* First Section */}
            <div className='flex h-40 justify-center items-center gap-3 border-b-2 border-b-gray-300 p-2 pr-5'>
                <div>
                    <Image
                        src="/Library-Logo.png"
                        alt="Library Logo"
                        width={100}
                        height={100}
                        priority
                    />
                </div>
                <h1 className="flex flex-col items-end font-sans font-bold text-xl leading-tight">
                    <span>Library</span>
                    <span>Management</span>
                    <span>System</span>
                </h1>
            </div>

            {/* Second Section */}
            <div className='flex flex-col gap-4 p-6 h-full'>
                <Link href="/dashboard">
                    <button className='w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition'>
                        Dashboard
                    </button>
                </Link>
                <Link href="/student">
                    <button className='w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition'>
                        Student
                    </button>
                </Link>
                <Link href="/book">
                    <button className='w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-lg transition'>
                        Book
                    </button>
                </Link>
                <Link href="/book-issue">
                    <button className='w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition'>
                        Book Issue
                    </button>
                </Link>
            </div>

            {/* Third Section */}
            <div className='flex h-25 border-t-2 border-t-gray-300 items-center p-5 justify-center'>
                <p className='bg-orange-200 p-4 rounded-lg italic text-sm font-serif'>
                    "A room without books is like a body without a soul"
                </p>
            </div>
        </div>
    )
}

export default Sidebar