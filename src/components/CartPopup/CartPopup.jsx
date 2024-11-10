import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart } from 'lucide-react';

export default function CartPopup({ isOpen, onClose, cart, removeFromCart, onCheckout }) {
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-gradient-to-br from-black/60 via-slate-900/70 to-black/80 z-50 flex items-center justify-center"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ y: 50, opacity: 0, scale: 0.9 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 50, opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl shadow-xl border border-slate-700 p-8 w-full max-w-lg mx-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header Section */}
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-semibold text-slate-200 tracking-widest">Your Cart</h2>
                            <motion.button
                                whileHover={{ scale: 1.15, rotate: 90 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onClose}
                                className="text-slate-300 hover:text-red-500 transition duration-200"
                            >
                                <X className="h-6 w-6" />
                            </motion.button>
                        </div>

                        {/* Cart Content */}
                        {cart.length === 0 ? (
                            <div className="text-center py-10">
                                <ShoppingCart className="h-16 w-16 text-slate-500 opacity-60 mx-auto mb-4" />
                                <p className="text-slate-300 text-lg">Your cart is currently empty.</p>
                            </div>
                        ) : (
                            <>
                                <ul className="divide-y divide-slate-700 mb-6">
                                    {cart.map((item, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="py-4 flex justify-between items-center text-slate-200"
                                        >
                                            <div className="flex gap-4 items-center">
                                                <div className="w-16 h-16 bg-slate-700 rounded-lg flex-shrink-0">
                                                    <img
                                                        src={item.image} // Placeholder for item image
                                                        alt={item.name}
                                                        className="w-full h-full object-cover rounded-lg"
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-medium">{item.name}</h3>
                                                    <p className="text-indigo-300">${item.price.toFixed(2)}</p>
                                                </div>
                                            </div>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => removeFromCart(item)}
                                                className="text-red-400 hover:text-red-500 transition duration-200"
                                            >
                                                Remove
                                            </motion.button>
                                        </motion.li>
                                    ))}
                                </ul>

                                {/* Total & Checkout */}
                                <div className="mt-6 flex justify-between items-center">
                                    <p className="text-xl font-semibold text-slate-300">Total: <span className="text-indigo-300">${totalPrice.toFixed(2)}</span></p>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={onCheckout}
                                        className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-lg transform transition duration-200 ease-in-out hover:scale-105"
                                    >
                                        Proceed to Checkout
                                    </motion.button>
                                </div>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
