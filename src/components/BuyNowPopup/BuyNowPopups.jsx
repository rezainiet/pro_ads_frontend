import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Plus, Minus } from 'lucide-react'
import { useState } from 'react'

export default function BuyNowPopup({ isOpen, onClose, product }) {
    const [quantity, setQuantity] = useState(1)

    if (!product) return null

    const incrementQuantity = () => setQuantity(q => q + 1)
    const decrementQuantity = () => setQuantity(q => Math.max(1, q - 1))

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md shadow-2xl border border-white border-opacity-20"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-bold text-white">Buy Now</h2>
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={onClose}
                                className="text-white hover:text-red-500 transition-colors"
                            >
                                <X className="h-6 w-6" />
                            </motion.button>
                        </div>
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-white mb-2">{product.name}</h3>
                            <p className="text-blue-300 text-lg">Price: ${product.price.toFixed(2)}</p>
                        </div>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            console.log('Purchasing:', { ...product, quantity })
                            onClose()
                        }} className="space-y-6">
                            <div className="flex items-center justify-between bg-white bg-opacity-10 rounded-lg p-4">
                                <span className="text-white">Quantity</span>
                                <div className="flex items-center space-x-4">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        type="button"
                                        onClick={decrementQuantity}
                                        className="text-white hover:text-blue-300 transition-colors"
                                    >
                                        <Minus className="h-5 w-5" />
                                    </motion.button>
                                    <span className="text-white text-xl font-semibold">{quantity}</span>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        type="button"
                                        onClick={incrementQuantity}
                                        className="text-white hover:text-blue-300 transition-colors"
                                    >
                                        <Plus className="h-5 w-5" />
                                    </motion.button>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-white text-lg">Total: <span className="text-blue-300 font-semibold">${(product.price * quantity).toFixed(2)}</span></p>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                className="w-full bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors shadow-lg flex items-center justify-center space-x-2"
                            >
                                <ShoppingBag className="h-5 w-5" />
                                <span>Confirm Purchase</span>
                            </motion.button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}