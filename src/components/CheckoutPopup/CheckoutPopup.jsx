'use client'

import { useState } from 'react'
import { X, Minus, Plus, Bitcoin } from 'lucide-react'

export default function CheckoutPopup({
    isOpen,
    onClose,
    product = {
        name: 'Best Quality Hotmail Email Accounts (Use for any purpose - 100% secured)',
        price: 0.50
    }
}) {
    const [email, setEmail] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [promoCode, setPromoCode] = useState('')
    const [error, setError] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const incrementQuantity = () => setQuantity(q => q + 1)
    const decrementQuantity = () => setQuantity(q => Math.max(1, q - 1))

    const totalPrice = product.price * quantity

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        if (!email.includes('@')) {
            setError('Please enter a valid email address')
            return
        }

        setIsSubmitting(true)
        try {
            await new Promise(resolve => setTimeout(resolve, 1500))
            console.log('Order submitted:', { email, quantity, promoCode, totalPrice })
            onClose()
        } catch (err) {
            setError('An error occurred during checkout')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-medium text-gray-900">{product.name}</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500 transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Enter E-mail..."
                            className="w-full p-3 bg-[#F0F7FF] rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 bg-[#F0F7FF] px-4 py-2 rounded-lg">
                                <button
                                    type="button"
                                    onClick={decrementQuantity}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <Minus className="h-4 w-4" />
                                </button>
                                <span className="w-16 text-center">{quantity} PC.</span>
                                <button
                                    type="button"
                                    onClick={incrementQuantity}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>

                            <input
                                type="text"
                                value={promoCode}
                                onChange={e => setPromoCode(e.target.value)}
                                placeholder="Promo code(if there is)..."
                                className="flex-1 ml-3 p-3 bg-[#F0F7FF] rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <h3 className="text-gray-600 mb-3">Payment methods</h3>
                            <div className="bg-[#F0F7FF] rounded-lg p-4">
                                <div className="flex justify-center items-center gap-4">
                                    {['BTC', 'USDT', 'ETH', 'LTC', 'USDC'].map((crypto) => (
                                        <div
                                            key={crypto}
                                            className="flex items-center justify-center w-10 h-10"
                                        >
                                            {crypto === 'BTC' ? (
                                                <Bitcoin className="h-8 w-8 text-[#F7931A]" />
                                            ) : (
                                                <span className="text-2xl text-gray-400">$</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="text-center text-sm text-gray-500 mt-2">
                                    Crypto (BTC, USDT, ETH, & MORE)
                                </div>
                            </div>
                        </div>

                        <div className="text-sm text-gray-500 text-center">
                            ⚠️ To pay using credit cards, Payoneer, or bank transfers, please{' '}
                            <a href="#contact" className="text-blue-500 hover:underline">
                                contact us
                            </a>
                            .
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-2xl font-semibold">${totalPrice.toFixed(2)}</span>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-8 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50"
                            >
                                {isSubmitting ? 'Processing...' : 'Checkout'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}