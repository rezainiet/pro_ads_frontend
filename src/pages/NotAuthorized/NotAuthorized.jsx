"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotAuthorized() {
    const [themeMode, setThemeMode] = useState("light"); // Initialize with light mode

    // Fetch dark mode setting from localStorage on mount
    useEffect(() => {
        const storedMode = localStorage.getItem("color-theme");
        if (storedMode) {
            setThemeMode(storedMode);
            if (storedMode === "dark") {
                document.documentElement.classList.add("dark");
            }
        }
    }, []);

    // Function to toggle between dark and light modes and save to localStorage
    const handleSetThemeMode = () => {
        const newMode = themeMode === "light" ? "dark" : "light";
        setThemeMode(newMode);
        localStorage.setItem("color-theme", newMode);

        if (newMode === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 transition-colors duration-500">
            <div className="w-full max-w-md p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl transform transition-all hover:scale-105 duration-500">
                <div className="flex justify-end mb-6">
                    <button
                        onClick={handleSetThemeMode}
                        className="p-2 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors duration-200"
                    >
                        {themeMode === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        {/* <span className="ml-2">{themeMode === "dark" ? "Light Mode" : "Dark Mode"}</span> */}
                    </button>
                </div>
                <div className="text-center">
                    <ShieldAlert className="w-24 h-24 mx-auto text-red-500 dark:text-red-400 mb-6 animate-pulse" />
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">Not Authorized</h1>
                    <p className="text-slate-600 dark:text-slate-400 mb-8">
                        Oops! It seems you don't have permission to access this page. Please check your credentials or contact the administrator.
                    </p>
                    <div className="space-y-4">
                        <button className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 transform">
                            <Link to="/">Go to Homepage</Link>
                        </button>
                        <button className="w-full py-3 px-6 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg transition-colors duration-200 transform">
                            Contact Support
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}