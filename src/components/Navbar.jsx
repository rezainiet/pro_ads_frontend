'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, X, Menu, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Navbar({ cart, setShowCart }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const navItems = ['Home', 'How to buy?', 'Blog', 'About Us', 'Contact Us']

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 120 }}
                className="sticky top-0 z-50 bg-white/10 backdrop-blur-lg border-b border-white/20"
            >
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="text-xl sm:text-2xl md:text-3xl font-bold text-white whitespace-nowrap"
                        >
                            PROADS.SHOP
                        </motion.div>
                        <div className="hidden lg:flex items-center space-x-6 text-white">
                            {navItems.map((item) => (
                                <motion.div key={item} whileHover={{ scale: 1.1 }}>
                                    <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="hover:text-blue-100 transition-colors text-sm md:text-base">
                                        {item}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="text-white hover:text-blue-100 hover:bg-blue-700/50 px-2 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base whitespace-nowrap"
                            >
                                Sign in
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="bg-white text-blue-600 hover:bg-blue-100 px-2 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base whitespace-nowrap"
                            >
                                My Purchases
                            </motion.button>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="relative"
                            >
                                <button
                                    onClick={() => setShowCart(true)}
                                    className="flex items-center gap-2 px-2 sm:px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                                    aria-label={`View cart with ${cart.length} items`}
                                >
                                    <ShoppingCart className="h-5 w-5" />
                                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                        {cart.length}
                                    </span>
                                </button>
                            </motion.div>
                        </div>
                        <div className="lg:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-white p-2"
                                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                            >
                                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="lg:hidden bg-blue-700/90 backdrop-blur-lg fixed top-[73px] left-0 right-0 z-40 overflow-hidden"
                    >
                        <div className="container mx-auto px-4 py-4">
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={item}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="py-2"
                                >
                                    <Link
                                        href={`/${item.toLowerCase().replace(' ', '-')}`}
                                        className="flex items-center justify-between text-white hover:text-blue-100 transition-colors text-lg"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <span>{item}</span>
                                        <ChevronRight className="h-5 w-5" />
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: navItems.length * 0.1 }}
                                className="mt-4 space-y-2"
                            >
                                <button className="w-full bg-white text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors text-base">
                                    Sign in
                                </button>
                                <button className="w-full bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors text-base">
                                    My Purchases
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}