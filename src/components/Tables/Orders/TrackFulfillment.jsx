import { useState } from 'react';
import { AiOutlineSearch, AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';

// Sample data for orders
const orderData = [
    {
        orderId: 'ORD001',
        customerName: 'John Doe',
        totalAmount: 150.0,
        orderDate: 'Sep 01, 2024',
        status: 'Pending',
    },
    {
        orderId: 'ORD002',
        customerName: 'Jane Smith',
        totalAmount: 200.0,
        orderDate: 'Sep 02, 2024',
        status: 'Shipped',
    },
    {
        orderId: 'ORD003',
        customerName: 'Alice Johnson',
        totalAmount: 250.0,
        orderDate: 'Sep 03, 2024',
        status: 'Delivered',
    },
    {
        orderId: 'ORD004',
        customerName: 'Bob Brown',
        totalAmount: 300.0,
        orderDate: 'Sep 04, 2024',
        status: 'Pending',
    },
];

const TrackFulfillment = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Update the filteredOrders to reflect the search term
    const filteredOrders = orderData.filter(order =>
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Breadcrumb pageName="Track Fulfillment" />
            <div className="max-w-5xl mx-auto p-6 bg-white rounded-md shadow-md dark:bg-boxdark">
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-white mb-6">
                    Track specific order by ID.
                </h2>

                <div className="mb-4 flex items-center justify-between border rounded">
                    <div></div>
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Search by Order ID"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-8 pr-4 py-2 border border-gray-300 rounded-md shadow-sm dark:border-strokedark dark:bg-boxdark dark:text-white w-full"
                        />
                        <AiOutlineSearch className="absolute left-2 top-2 text-gray-500 dark:text-gray-400" size={20} />
                    </div>
                </div>

                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto border-collapse dark:border-strokedark">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-meta-4">
                                <th className="py-4 px-6 font-medium text-left text-black dark:text-white">
                                    Order ID
                                </th>
                                <th className="py-4 px-6 font-medium text-left text-black dark:text-white">
                                    Customer Name
                                </th>
                                <th className="py-4 px-6 font-medium text-center text-black dark:text-white">
                                    Total Amount
                                </th>
                                <th className="py-4 px-6 font-medium text-center text-black dark:text-white">
                                    Order Date
                                </th>
                                <th className="py-4 px-6 font-medium text-center text-black dark:text-white">
                                    Status
                                </th>
                                <th className="py-4 px-6 font-medium text-center text-black dark:text-white">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order, index) => (
                                <tr key={index} className="border-b dark:border-strokedark">
                                    <td className="py-4 px-6 text-black dark:text-white">
                                        {order.orderId}
                                    </td>
                                    <td className="py-4 px-6 text-black dark:text-white">
                                        {order.customerName}
                                    </td>
                                    <td className="py-4 px-6 text-center text-black dark:text-white">
                                        ${order.totalAmount}
                                    </td>
                                    <td className="py-4 px-6 text-center text-black dark:text-white">
                                        {order.orderDate}
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <span
                                            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${order.status === 'Pending'
                                                ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-500 dark:text-yellow-100'
                                                : order.status === 'Shipped'
                                                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-500 dark:text-blue-100'
                                                    : 'bg-green-100 text-green-600 dark:bg-green-500 dark:text-green-100'
                                                }`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-center flex justify-center space-x-2">
                                        <button className="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-400">
                                            <AiOutlineEye size={20} />
                                        </button>
                                        <button className="text-yellow-500 hover:text-yellow-700 dark:text-yellow-300 dark:hover:text-yellow-400">
                                            <AiOutlineEdit size={20} />
                                        </button>
                                        <button className="text-red-500 hover:text-red-700 dark:text-red-300 dark:hover:text-red-400">
                                            <AiOutlineDelete size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TrackFulfillment;
