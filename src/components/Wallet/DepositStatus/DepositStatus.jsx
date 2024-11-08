import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, AlertCircle, Search } from 'lucide-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebaseInit';

export default function DepositStatus() {
    const [user] = useAuthState(auth);
    const [deposits, setDeposits] = useState([]);
    const [filteredDeposits, setFilteredDeposits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchDeposits = async () => {
            try {
                const response = await axios.get(`https://ads-agency-backend.vercel.app/getDeposits/${user?.email}`);
                setDeposits(response.data);
                setFilteredDeposits(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch deposits. Please try again later.');
                setLoading(false);
            }
        };

        fetchDeposits();
    }, []);

    useEffect(() => {
        const results = deposits.filter((deposit) =>
            deposit.amount.toString().includes(searchTerm) ||
            deposit.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            deposit.status.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredDeposits(results);
    }, [searchTerm, deposits]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-4">
                <div className="flex">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                    <p className="ml-3 text-sm text-red-700">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-900 shadow-lg rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 bg-slate-50 dark:bg-slate-800">
                <h3 className="text-lg leading-6 font-medium text-slate-900 dark:text-slate-100">Add Money Status</h3>
                <p className="mt-1 max-w-2xl text-sm text-slate-500 dark:text-slate-400">Your recent deposit transactions</p>
            </div>
            <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by amount, transaction ID, or status"
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400 dark:text-slate-500" />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                    <thead className="bg-slate-50 dark:bg-slate-800">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-400">
                                Transaction ID
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-400">
                                Amount
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-400">
                                Payment Method
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-400">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-400">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-700">
                        {filteredDeposits.map((deposit) => (
                            <tr key={deposit._id} className="hover:bg-slate-50 dark:hover:bg-slate-800">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <img className="h-10 w-10 rounded-full" src={deposit.imgLink} alt="Proof of payment" />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-slate-900 dark:text-slate-100">{deposit.transactionId}</div>
                                            <div className="text-sm text-slate-500 dark:text-slate-400">{deposit.userEmail}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-slate-900 dark:text-slate-100">${deposit.amount.toFixed(2)}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-slate-900 dark:text-slate-100">{deposit.paymentMethod.toUpperCase()}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-slate-900 dark:text-slate-100">
                                        {new Date(deposit.timestamp).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${deposit.status === 'pending'
                                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                                            : deposit.status === 'approved'
                                                ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                                : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                                            }`}
                                    >
                                        {deposit.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {filteredDeposits.length === 0 && (
                <div className="text-center py-4 text-slate-500 dark:text-slate-400">No deposits found matching your search.</div>
            )}
        </div>
    );
}
