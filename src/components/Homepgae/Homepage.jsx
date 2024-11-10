'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Zap, ShieldCheck, Menu, X, Facebook, ChevronRight, ShoppingCart, Filter, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar'
import CartPopup from '../CartPopup/CartPopup'
import BuyNowPopup from '../BuyNowPopup/BuyNowPopups'
import CheckoutPopup from '../CheckoutPopup/CheckoutPopup'
import productAPI from '../../utils/productAPI.json'


export default function Home() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [showFilters, setShowFilters] = useState(false)
    const [cart, setCart] = useState([])
    const [showCart, setShowCart] = useState(false)
    const [showCheckout, setShowCheckout] = useState(false)
    const [showBuyNow, setShowBuyNow] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [showOnlyInStock, setShowOnlyInStock] = useState(false)

    useEffect(() => {
        fetchProducts()
    }, [])

    useEffect(() => {
        filterProducts()
    }, [products, searchTerm, showOnlyInStock])

    const fetchProducts = async () => {
        try {
            setProducts(productAPI)
            setFilteredProducts(productAPI)
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }

    const filterProducts = () => {
        let filtered = products
        if (searchTerm) {
            filtered = filtered.map(category => ({
                ...category,
                items: category.items.filter(product =>
                    product.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
            })).filter(category => category.items.length > 0)
        }
        if (showOnlyInStock) {
            filtered = filtered.map(category => ({
                ...category,
                items: category.items.filter(product => product.inStock > 0)
            })).filter(category => category.items.length > 0)
        }
        setFilteredProducts(filtered)
    }

    const addToCart = (product) => {
        setCart([...cart, product])
    }

    const removeFromCart = (productToRemove) => {
        setCart(cart.filter(product => product.id !== productToRemove.id))
    }

    const handleBuyNow = (product) => {
        setSelectedProduct(product)
        setShowBuyNow(true)
    }

    const handleConfirmPurchase = (product) => {
        setShowBuyNow(false)
        setSelectedProduct(product)
        setShowCheckout(true)
    }

    const handleCheckoutClose = () => {
        setShowCheckout(false)
        setSelectedProduct(null)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400">
            <Navbar cart={cart} setShowCart={setShowCart} />

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="container mx-auto px-4 py-12"
            >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                            Your #1 agency for{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
                                advertising assets
                            </span>{' '}
                            & solutions!
                        </h1>
                        <p className="text-xl text-white/90">
                            We&apos;re proud to support your business and help you overcome obstacles from
                            Facebook bans. Our dedication ensures effective solutions to scale your ads and
                            business. 🥇
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex space-x-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 bg-white text-blue-600 hover:bg-blue-100 rounded-lg transition-colors text-lg font-semibold"
                            >
                                Get Started
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 text-white border border-white hover:bg-white/10 rounded-lg transition-colors text-lg font-semibold"
                            >
                                Learn More
                            </motion.button>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-3 gap-4 pt-6">
                            {[
                                { icon: Zap, text: 'Instant delivery' },
                                { icon: MessageCircle, text: 'Best Support' },
                                { icon: ShieldCheck, text: '100% Secure' },
                            ].map((feature, index) => (
                                <motion.div
                                    key={feature.text}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex flex-col items-center text-white"
                                >
                                    <feature.icon className="h-10 w-10 mb-2" />
                                    <span className="text-center">{feature.text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="hidden md:block">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
                            className="relative"
                        >
                            <div className="absolute -right-20 top-0">
                                <Facebook className="w-[400px] h-[400px] text-white/90" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Product Listing Section */}
            <div className="bg-white/5 backdrop-blur-lg mt-16">
                <div className="container mx-auto px-4 py-8">
                    {/* Filters */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-white">Products</h2>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <Filter className="h-5 w-5" />
                                Filters
                            </motion.button>
                        </div>
                        <AnimatePresence>
                            {showFilters && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="p-4 bg-white/10 rounded-lg backdrop-blur-lg overflow-hidden"
                                >
                                    <div className="flex flex-wrap gap-4">
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                id="inStock"
                                                checked={showOnlyInStock}
                                                onChange={(e) => setShowOnlyInStock(e.target.checked)}
                                                className="rounded border-white/20 bg-white/10 text-blue-500 focus:ring-blue-500"
                                            />
                                            <label htmlFor="inStock" className="text-white">Show Only In Stock</label>
                                        </div>
                                        <div className="relative flex-grow">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
                                            <input
                                                type="search"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                placeholder="Search products..."
                                                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Product Categories */}
                    <div className="space-y-8">
                        {filteredProducts.map((category) => (
                            <motion.div
                                key={category.category}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden"
                            >
                                <div className="bg-white/10 px-6 py-4">
                                    <h3 className="text-xl font-bold text-white">{category.category}</h3>
                                </div>
                                <div className="divide-y divide-white/10">
                                    {category.items.map((product, index) => (
                                        <motion.div
                                            key={index}
                                            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[auto,1fr,auto,auto] gap-4 items-center p-4 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="bg-white/10 p-2 rounded-lg">
                                                    <Facebook className="h-6 w-6 text-white" />
                                                </div>
                                                <p className="text-white font-medium text-sm sm:text-base">{product.name}</p>
                                            </div>
                                            <div className="text-center md:text-left">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500/20 text-blue-200">
                                                    {product.inStock} pcs.
                                                </span>
                                            </div>
                                            <div className="text-white font-semibold text-center md:text-left">
                                                ${product.price.toFixed(2)} <span className="text-white/60">/ 1 pcs.</span>
                                            </div>
                                            <div className="flex justify-end md:justify-start gap-2">
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => handleBuyNow(product)}
                                                    className="px-4 sm:px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-xs sm:text-sm"
                                                >
                                                    Buy now
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => addToCart(product)}
                                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                                >
                                                    <ShoppingCart className="h-5 w-5 text-white" />
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-white/5 backdrop-blur-lg mt-16 py-12">
                <div className="container mx-auto px-4">
                    {/* Email Subscription */}
                    <div className="bg-white/10 rounded-xl p-6 mb-12">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">Get updates and special offers from Pro Ads</h3>
                                <p className="text-white/70">Don&apos;t want to miss any of our updates? then join our email list. You&apos;ll receive all of the most recent advertising updates, discounts, and other awesome news straight to your inbox.</p>
                                <div className="flex gap-4 mt-4">
                                    <input
                                        type="email"
                                        placeholder="Enter the email address..."
                                        className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60"
                                    />
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                                    >
                                        Subscribe
                                    </motion.button>
                                </div>
                            </div>
                            <div className="flex items-center justify-center">
                                <div className="text-center">
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        className="bg-blue-500/20 p-4 rounded-full inline-block mb-4"
                                    >
                                        <MessageCircle className="h-12 w-12 text-blue-400" />
                                    </motion.div>
                                    <h4 className="text-xl font-bold text-white">Be a part of our biggest <span className="text-blue-400">community</span></h4>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Links */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                        {[
                            { title: 'INQUIRIES', links: ['Home', 'About Us', 'Recommendations'] },
                            { title: 'HELP', links: ['Contact Us', 'How to buy?', 'FAQ'] },
                            { title: 'POLICIES', links: ['Privacy Policy', 'Shipping And Delivery', 'Terms & Conditions'] },
                            { title: 'USEFUL LINKS', links: ['Blog', 'My Purchases', '2FA Code Generator'] },
                        ].map((section, index) => (
                            <motion.div
                                key={section.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <h4 className="text-lg font-bold text-white mb-4">{section.title}</h4>
                                <ul className="space-y-2">
                                    {section.links.map((link) => (
                                        <motion.li key={link} whileHover={{ x: 5 }}>
                                            <Link to={`/${link.toLowerCase().replace(/\s+/g, '-')}`} className="text-white/70 hover:text-white">
                                                {link}
                                            </Link>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>

                    {/* Social Media */}
                    <div className="flex justify-center gap-4 mb-8">
                        {['blue', 'green', 'red', 'indigo'].map((color, index) => (
                            <motion.a
                                key={color}
                                href="#"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className={`bg-${color}-500/20 p-3 rounded-full hover:bg-${color}-500/30 transition-colors`}
                            >
                                <MessageCircle className="h-6 w-6 text-white" />
                            </motion.a>
                        ))}
                    </div>

                    {/* Payment Methods */}
                    <div className="grid grid-cols-4 md:grid-cols-8 gap-4 items-center justify-center mb-8">
                        {['Wire', 'IBAN', 'Ethereum', 'Tether', 'Coinbase', 'Bitcoin', 'USDCoin', 'Bank Transfer'].map((method) => (
                            <motion.div
                                key={method}
                                whileHover={{ scale: 1.05 }}
                                className="bg-white/10 p-3 rounded-lg"
                            >
                                <div className="text-white/40 text-center text-sm">{method}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Security Badges */}
                    <div className="flex justify-center gap-8 mb-8">
                        {['McAfee SECURE', 'TRUSTe', 'Norton'].map((badge) => (
                            <motion.div
                                key={badge}
                                whileHover={{ scale: 1.05 }}
                                className="bg-white/10 px-4 py-2 rounded-lg"
                            >
                                <div className="text-white/40 text-sm">{badge}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Copyright */}
                    <div className="text-center text-white/40 text-sm">
                        Copyright © 2024 PROADS.SHOP
                    </div>
                </div>
            </footer>

            {/* Floating cart button for mobile */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="fixed bottom-4 right-4 md:hidden"
            >
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowCart(true)}
                    className="relative p-4 bg-blue-500 text-white rounded-full shadow-lg"
                >
                    <ShoppingCart className="h-6 w-6" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cart.length}
                    </span>
                </motion.button>
            </motion.div>

            {/* Cart Popup */}
            <CartPopup
                isOpen={showCart}
                onClose={() => setShowCart(false)}
                cart={cart}
                removeFromCart={removeFromCart}
                onCheckout={() => {
                    setShowCart(false)
                    setShowCheckout(true)
                }}

            />

            {/* Checkout Popup */}
            <CheckoutPopup
                isOpen={showCheckout}
                onClose={handleCheckoutClose}
                product={selectedProduct || { name: 'Cart Items', price: cart.reduce((sum, item) => sum + item.price, 0) }}
            />

            {/* Buy Now Popup */}
            <BuyNowPopup
                isOpen={showBuyNow}
                onClose={() => setShowBuyNow(false)}
                product={selectedProduct}
                onConfirmPurchase={handleConfirmPurchase}
            />
        </div>
    )
}