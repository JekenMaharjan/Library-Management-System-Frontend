"use client"

import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { getIssuedBook, getTotalStudent } from '@/lib/api'
import React, { useEffect, useState } from 'react'
import { FaAngleDoubleUp, FaKey } from 'react-icons/fa'
import { GiThink } from 'react-icons/gi'
import { IoLibrarySharp } from "react-icons/io5";
import { SiMoneygram } from 'react-icons/si'

type BookStats = {
    totalBooks: number;
    issuedBooks: number;
    availableBooks: number;
};

type StudentStats = {
    totalStudents: number;
}

const motiveCard = [
    {
        icon: <IoLibrarySharp
        size={50}
        className='text-orange-400'
        />,
        title: "Knowledge is Power",
        description: "A library is not just books, it's a gateway to wisdom. Open a book and empower yourself."
    },
    {
        icon: <FaKey
            size={50}
            className='text-orange-400'
        />,
        title: "Consistency is Key",
        description: "Read a little every day. Small steps in learning create great achievements over time."
    },
    {
        icon: <FaAngleDoubleUp 
            size={50}
            className='text-orange-400'
        />,
        title: "Discipline Breeds Success",
        description: "A disciplined mind organizes knowledge efficiently. Keep track of your reading and learning."
    },
    {
        icon: <GiThink
            size={50}
            className='text-orange-400'
        />,
        title: "Curiosity Never Fails",
        description: "Every book holds a question and its answer. Stay curious, and you’ll never stop growing."
    },
    {
        icon: <SiMoneygram
            size={50}
            className='text-orange-400'
        />,
        title: "Invest in Yourself",
        description: "Time spent in a library is an investment in your mind. Learn, explore, and succeed."
    }
];

const DashboardPage = () => {
    const [bookStats, setBookStats] = useState<BookStats | null>(null);
    const [studentStats, setStudentStats] = useState<StudentStats | null>(null);

    const [currentCard, setCurrentCard] = useState(motiveCard[0]);

    useEffect(() => {
        loadBookStats();
        loadStudentStats();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            // Pick a random index
            const randomIndex = Math.floor(Math.random() * motiveCard.length);
            setCurrentCard(motiveCard[randomIndex]);
        }, 5000); // Change every 5 seconds


        // Cleanup on unmount
        return () => clearInterval(interval);
    }, []);

    const statsCards = [
        {
            title: "Total Students",
            description: "Total Students in Library",
            value: studentStats?.totalStudents ?? 0,
        },
        {
            title: "Total Books",
            description: "Total physical books in library",
            value: bookStats?.totalBooks ?? 0,
        },
        {
            title: "Issued Books",
            description: "Books currently issued",
            value: bookStats?.issuedBooks ?? 0,
        },
        {
            title: "Available Books",
            description: "Books available in stock",
            value: bookStats?.availableBooks ?? 0,
        },
    ];

    

    const loadBookStats = async () => {
        try {
            const data = await getIssuedBook();
            setBookStats(data);
        } catch (error) {
            console.error("Failed to fetch book stats", error);
        }
    };

    const loadStudentStats = async () => {
        try {
            const data = await getTotalStudent();
            setStudentStats(data);
        } catch (error) {
            console.error("Failed to fetch book stats", error);
        }
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />

            <div className="flex-1 flex flex-col ml-70 min-h-screen">
                <Header />

                {/* Main container */}
                <main className="flex-1 p-6 overflow-auto space-y-6">
                    {/* 1st Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {statsCards.map((card, index) => (
                            <div
                                key={index}
                                className="flex justify-between bg-white border-2 border-orange-200 rounded-lg hover:shadow-md p-6"
                            >
                                <div className="flex flex-col gap-3">
                                    <h2 className="font-semibold text-xl text-orange-600">{card.title}</h2>
                                    <p className="text-gray-600 text-sm">{card.description}</p>
                                </div>
                                <p className="text-orange-600 font-bold text-3xl">{card.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* 2nd Section */}
                    <div className="flex justify-between place-items-center bg-orange-50 border-2 border-orange-200 rounded-lg hover:shadow-md p-6 transition-all duration-500">
                        <div>
                            {currentCard.icon}
                        </div>
                        <div>
                            <h2 className="font-semibold font-serif text-2xl italic text-center text-orange-600">{currentCard.title}</h2>
                            <p className="text-orange-500 font-serif italic text-center text-md">{currentCard.description}</p>
                        </div>
                        <div>
                            {currentCard.icon}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default DashboardPage