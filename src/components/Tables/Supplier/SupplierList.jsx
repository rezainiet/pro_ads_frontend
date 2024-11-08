import { useState, useEffect } from 'react';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';
import { getSuppliers } from '../../../utils/apiUtils';

const SupplierList = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch suppliers from the API on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getSuppliers(); // Fetch suppliers from API
                setSuppliers(data);
            } catch (err) {
                setError('Error fetching suppliers');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter suppliers based on the search term
    const filteredSuppliers = suppliers.filter((supplier) =>
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.phone.includes(searchTerm)
    );

    if (loading) {
        return <p>Loading suppliers...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <Breadcrumb pageName="Supplier List" />
            <div className="max-w-5xl mx-auto p-6 bg-white rounded-md shadow-md dark:bg-boxdark">
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-white mb-6">
                    Supplier List
                </h2>

                <div className="mb-6">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search by name, email, or phone"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md dark:border-strokedark dark:bg-boxdark dark:text-white"
                    />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredSuppliers.map((supplier) => (
                        <div key={supplier._id} className="bg-white dark:bg-boxdark border border-gray-200 rounded-lg shadow-md p-4">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{supplier.name}</h3>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Contact: {supplier.contactPerson}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Email: {supplier.email}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Phone: {supplier.phone}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Address: {supplier.address}</p>

                            <div className="mt-4 flex justify-end">
                                <button
                                    className="px-4 py-2 text-white bg-indigo-500 hover:bg-indigo-600 rounded-md"
                                    onClick={() => alert(`Edit supplier ${supplier.name}`)} // Replace with actual edit functionality
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SupplierList;
