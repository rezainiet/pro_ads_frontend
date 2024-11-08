import React, { useState } from 'react';
import axios from 'axios';
import { Circles } from 'react-loader-spinner';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ClipboardIcon, CheckIcon } from 'lucide-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebaseInit';

export default function AddMoney() {
    const [user] = useAuthState(auth);
    const [amount, setAmount] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('usdt');
    const [image, setImage] = useState(null);
    const [imageLink, setImageLink] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState('');
    const [fileName, setFileName] = useState('');

    const depositAddress = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'; // Example deposit address

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
            setFileName(e.target.files[0].name); // Set the file name
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setImage(e.dataTransfer.files[0]);
            setFileName(e.dataTransfer.files[0].name); // Set the file name
            e.dataTransfer.clearData(); // Clear the data
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (amount < 50) {
            setError('Minimum deposit amount is $50.');
            return;
        }

        if (!image) {
            setError('Please upload an image.'); // Set the error message
            return;
        }

        setLoading(true);
        setError(''); // Reset error message

        try {
            const formData = new FormData();
            formData.append('image', image);
            const response = await axios.post('https://api.imgbb.com/1/upload?key=b379cea0ac99373d4d9466d4578912f3', formData);
            const imgLink = response.data.data.url;
            setImageLink(imgLink);

            // Log all the data
            const depositData = {
                userEmail: user?.email,
                amount,
                transactionId,
                paymentMethod,
                imgLink,
            };
            console.log(depositData);

            // Send the data to your API endpoint
            await axios.post(`https://ads-agency-backend.vercel.app/deposit/${user?.email}`, depositData);

            // Reset form values
            setAmount('');
            setTransactionId('');
            setImage(null);
            setFileName('');
            setImageLink(''); // Reset image link if needed

            // Optionally, display a success message
            alert('Deposit successfully added!'); // You can replace this with a more elegant notification method

        } catch (error) {
            console.error('Error uploading image or sending deposit data:', error);
            setError('An error occurred. Please try again.'); // Set a user-friendly error message
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-slate-800 shadow-xl rounded-lg overflow-hidden">
                    <div className="px-6 py-8 sm:p-10">
                        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-8">Add Money</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="amount" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Amount
                                </label>
                                <input
                                    type="number"
                                    id="amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="mt-1 block w-full border border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-slate-700 dark:text-white"
                                    placeholder="Enter Amount"
                                    required
                                />
                                {error && <p className="text-red-600 text-sm mt-1">{error}</p>} {/* Display error message */}
                            </div>
                            <div>
                                <label htmlFor="transactionId" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Transaction ID
                                </label>
                                <input
                                    type="text"
                                    id="transactionId"
                                    value={transactionId}
                                    onChange={(e) => setTransactionId(e.target.value)}
                                    className="mt-1 block w-full border border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-slate-700 dark:text-white"
                                    placeholder="Enter Transaction ID"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="proofOfPayment" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Proof of Payment
                                </label>
                                <div
                                    className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 dark:border-slate-600 border-dashed rounded-md"
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                >
                                    <div className="space-y-1 text-center">
                                        <svg
                                            className="mx-auto h-12 w-12 text-slate-400"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 48 48"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <div className="flex text-sm text-slate-600 dark:text-slate-400">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer bg-white dark:bg-slate-700 rounded-md font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                            >
                                                <span className='px-5 py-2'>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" required />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">PNG, JPG, GIF up to 10MB</p>
                                        {fileName && <p className="text-sm text-slate-600 dark:text-slate-300">Selected File: {fileName}</p>} {/* Show selected filename */}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <Circles color="#ffffff" height={24} width={24} />
                                    ) : (
                                        'Add Money'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                    {paymentMethod === 'usdt' && (
                        <div className="px-6 py-8 bg-slate-50 dark:bg-slate-700 sm:px-10">
                            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">Deposit Address</h3>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    type="text"
                                    readOnly
                                    value={depositAddress}
                                    className="block w-full pr-10 border-slate-300 dark:border-slate-600 focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm dark:bg-slate-700 dark:text-white"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                                    <CopyToClipboard text={depositAddress} onCopy={() => setCopied(true)}>
                                        <button className="bg-white dark:bg-slate-800 rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-600">
                                            {copied ? (
                                                <CheckIcon className="h-5 w-5 text-green-500" />
                                            ) : (
                                                <ClipboardIcon className="h-5 w-5 text-slate-500" />
                                            )}
                                        </button>
                                    </CopyToClipboard>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
