import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebaseInit';
import { X } from 'lucide-react';
import axios from 'axios';

// Custom Button component
const Button = ({ children, onClick, className = '', disabled = false }) => (
    <button
        className={`px-4 py-2 rounded font-semibold text-sm ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={onClick}
        disabled={disabled}
    >
        {children}
    </button>
);

// Custom Input component
const Input = ({ value, onChange, placeholder, className = '' }) => (
    <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border rounded px-3 py-2 ${className}`}
    />
);

// Custom Badge component
const Badge = ({ children, className = '' }) => (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${className}`}>
        {children}
    </span>
);

// Modal component for BM Share popup
const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 transition-all duration-150 ease-in-out bg-green-100 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-xl relative max-w-md w-full">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    aria-label="Close"
                >
                    <X size={24} />
                </button>
                {children}
            </div>
        </div>
    );
};

// Message component
const Message = ({ message, type }) => {
    const bgColor = type === 'success' ? 'bg-green-100 dark:bg-green-800' : 'bg-red-100 dark:bg-red-800';
    const textColor = type === 'success' ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200';

    return (
        <div className={`${bgColor} ${textColor} p-4 rounded-md mb-4`}>
            {message}
        </div>
    );
};

const AdAccountListTable = () => {
    const [user] = useAuthState(auth);
    const [accounts, setAccounts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bmId, setBmId] = useState('');
    const [selectedAccountId, setSelectedAccountId] = useState(null);
    const [message, setMessage] = useState(null);

    // Fetch ad accounts from the API when the component mounts
    useEffect(() => {
        const fetchAdAccounts = async () => {
            try {
                const response = await fetch(`https://ads-agency-backend.vercel.app/getUserAdAccounts/${user?.email}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch ad accounts');
                }
                const data = await response.json();
                setAccounts(data);
            } catch (error) {
                console.error(error);
                setMessage({ text: 'Failed to fetch ad accounts. Please try again later.', type: 'error' });
            }
        };

        if (user?.email) {
            fetchAdAccounts();
        }
    }, [user?.email]);

    // Filtered accounts based on search term
    const filteredAccounts = accounts.filter(account =>
        account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.adAccountType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle account deletion
    const handleDelete = (id) => {
        setAccounts(accounts.filter(account => account.id !== id));
        setMessage({ text: 'Account deleted successfully', type: 'success' });
    };

    // Get status badge color
    const getStatusBadge = (status) => {
        const statusStyles = {
            'Active': 'dark:bg-green-800 dark:text-green-200 bg-green-100 text-green-800',
            'Paused': 'dark:bg-yellow-800 dark:text-yellow-200 bg-yellow-100 text-yellow-800',
            'Inactive': 'dark:bg-red-800 dark:text-red-200 bg-red-100 text-red-800',
            'Pending': 'dark:bg-blue-800 dark:text-blue-200 bg-blue-100 text-blue-800'
        };
        return <Badge className={statusStyles[status]}>{status}</Badge>;
    };

    // Handle BM Share button click
    const handleBMShare = (accountId) => {
        setSelectedAccountId(accountId);
        setIsModalOpen(true);
    };

    // Handle submit for BM Share
    const handleSubmitBMShare = async () => {
        try {
            const result = await axios.put(`https://ads-agency-backend.vercel.app/updateAdAccountBmId/${selectedAccountId}`, { bmId });
            if (result.status === 200) {
                setIsModalOpen(false);
                setBmId('');
                setSelectedAccountId(null);
                setMessage({ text: 'Account shared successfully', type: 'success' });
                // Update the account in the local state
                setAccounts(accounts.map(account =>
                    account.id === selectedAccountId
                        ? { ...account, bmId: bmId, status: 'Paused' }
                        : account
                ));
            } else {
                throw new Error('Failed to share account');
            }
        } catch (error) {
            console.error('Error sharing account:', error);
            setMessage({ text: 'Failed to share account. Please try again.', type: 'error' });
        }
    };

    return (
        <div className="p-4 dark:bg-slate-900 bg-slate-200 rounded-lg shadow-lg">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold dark:text-white text-slate-800">Ad Account List</h2>
                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                    Add Account
                </Button>
            </div>

            {/* Message display */}
            {message && <Message message={message.text} type={message.type} />}

            {/* Search Input */}
            <div className="mb-4">
                <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search accounts..."
                    className="w-full dark:bg-slate-800 dark:text-white bg-white text-slate-800"
                />
            </div>

            {/* Account Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                    <thead className="bg-slate-50 dark:bg-slate-800">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium dark:text-slate-300 text-slate-500 uppercase tracking-wider">Ad Account ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium dark:text-slate-300 text-slate-500 uppercase tracking-wider">Account Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium dark:text-slate-300 text-slate-500 uppercase tracking-wider">Platform</th>
                            <th className="px-6 py-3 text-left text-xs font-medium dark:text-slate-300 text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium dark:text-slate-300 text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-700">
                        {filteredAccounts.map((account) => (
                            <tr key={account.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-slate-400 text-slate-500">{account.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium dark:text-slate-200 text-slate-900">{account.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-slate-400 text-slate-500">{account.adAccountType}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-slate-400 text-slate-500">{getStatusBadge(account.status)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <Button
                                        disabled={account?.bmId}
                                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-300 dark:hover:text-indigo-400 mr-2"
                                        onClick={() => handleBMShare(account.id)}
                                    >
                                        {account?.bmId ? "Already Shared" : "BM Share"}
                                    </Button>
                                    <Button
                                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-500"
                                        onClick={() => handleDelete(account.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* BM Share Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h3 className="text-lg font-semibold mb-4 dark:text-white">Share with Business Manager</h3>
                <Input
                    value={bmId}
                    onChange={(e) => setBmId(e.target.value)}
                    placeholder="Enter Business Manager ID"
                    className="w-full mb-4 dark:bg-slate-700 dark:text-white"
                />
                <Button
                    onClick={handleSubmitBMShare}
                    disabled={!bmId}
                    className="w-full bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300"
                >
                    Submit
                </Button>
            </Modal>
        </div>
    );
};

export default AdAccountListTable;