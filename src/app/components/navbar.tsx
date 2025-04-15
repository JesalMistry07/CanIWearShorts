"use client"
// Navbar.js

import React, { useState } from 'react';
import { useNavbar } from '../context/NavbarContext';

type NavbarProps = {
    isOpen: boolean; 
    setIsOpen: (open: boolean) => void
}

const Navbar = () => {

    const {isOpen, setIsOpen } = useNavbar();

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Brand Name */}
                <a href="/" className="text-black lg:justify-self-start lg:pl-4 text-lg font-semibold">Can I Wear Shorts?
                </a>

                {/* Hamburger Menu for mobile */}
                <button onClick={() => setIsOpen(!isOpen)}
                    className="text-black focus:outline-none md:hidden cursor-auto">
                    {/* Hamburger Icon and Close Icon */}
                    {isOpen ? (
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">

                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    )}
                </button>

                {/* Navigation Links */}
                <div
                    className={`absolute top-16 left-0 w-full z-50 bg-white border-b-4 lg:border-none md:border-none transition-transform duration-500 ease-in-out transform md:relative md:top-0 md:left-0 md:flex md:items-center md:space-x-4 md:bg-transparent md:w-auto md:translate-x-0 ${isOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    <div className="flex flex-col md:flex-row px-4 py-4 space-y-2 md:space-y-0 md:space-x-4">
                        <a href="/" className="text-black hover:text-gray-600 lg:border-b-2 md:border-b-2 hover:border-t-indigo-950">Home</a>
                        {/* <a href="#analytics" className="text-black hover:text-gray-600 lg:border-b-2 md:border-b-2">Analytics</a> */}
                        <a href="//www.jesalmistry.com/#contact" className="text-black hover:text-gray-600 lg:border-b-2 md:border-b-2">Contact</a>
                    </div>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;
