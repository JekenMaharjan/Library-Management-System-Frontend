"use client"

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation' // for highlighting current page

const Sidebar = () => {
    const pathname = usePathname(); // gets current page

    const links = [
        { href: "/dashboard", label: "Dashboard" },
        { href: "/student", label: "Student Records" },
        { href: "/book", label: "Book Records" },
        { href: "/book-issue", label: "Book Circulation" },
    ];

    return (
        <div className="flex flex-col border-r-2 border-orange-300 fixed top-0 left-0 h-screen w-72 justify-between
                bg-gradient-to-b from-orange-200 to-white">

            {/* First Section: Logo + Title */}
            <div className="flex flex-col items-center justify-center gap-2 h-30 border-b-2 border-orange-300 p-4">
                <Image
                    src="/Library-Logo.png"
                    alt="Library Logo"
                    width={120}
                    height={120}
                    priority
                />
                
            </div>

            {/* Second Section: Links */}
            <div className="flex flex-col gap-4 p-6 mx-5 h-full">
                {links.map((item) => (
                    <Link key={item.href} href={item.href} passHref>
                        <button
                            className={`w-full text-start font-semibold py-3 px-4 rounded-lg transition 
                                ${pathname === item.href
                                    ? "bg-orange-500 text-white"
                                    : "bg-orange-300 text-gray-900 hover:bg-orange-400"}`
                            }
                        >
                            {item.label}
                        </button>
                    </Link>
                ))}
            </div>

            {/* Third Section: Quote */}
            <div className="flex items-center justify-center p-4 border-t-2 border-orange-300 bg-orange-50">
                <p className="bg-orange-200 p-3 rounded-lg text-gray-900 italic text-sm text-center font-serif">
                    "A room without books is like a body without a soul"
                </p>
            </div>
        </div>
    )
}

export default Sidebar
