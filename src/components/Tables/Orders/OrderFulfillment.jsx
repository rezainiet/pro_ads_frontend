import { FaCheck, FaEye } from 'react-icons/fa';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';

const fulfillmentData = [
    {
        orderNumber: 'ORD12345',
        customerName: 'John Doe',
        totalAmount: 120.0,
        orderDate: `Sep 01, 2024`,
        status: 'Pending',
    },
    {
        orderNumber: 'ORD12346',
        customerName: 'Jane Smith',
        totalAmount: 89.0,
        orderDate: `Sep 02, 2024`,
        status: 'Pending',
    },
    {
        orderNumber: 'ORD12347',
        customerName: 'Alice Johnson',
        totalAmount: 45.0,
        orderDate: `Sep 03, 2024`,
        status: 'Pending',
    },
    {
        orderNumber: 'ORD12348',
        customerName: 'Bob Brown',
        totalAmount: 75.0,
        orderDate: `Sep 04, 2024`,
        status: 'Pending',
    },
];

const OrderFulfillment = () => {
    return (
        <>
            <Breadcrumb pageName="Order Fulfillment" />

            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                    Order Number
                                </th>
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                    Customer Name
                                </th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    Total Amount
                                </th>
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                    Order Date
                                </th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">
                                    Status
                                </th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {fulfillmentData.map((order, key) => (
                                <tr key={key}>
                                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {order.orderNumber}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {order.customerName}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            ${order.totalAmount}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {order.orderDate}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium bg-warning text-warning">
                                            {order.status}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <div className="flex items-center space-x-3.5">
                                            <button className="hover:text-primary">
                                                <FaEye className="w-5 h-5 text-gray-500" />
                                            </button>
                                            <button className="hover:text-primary">
                                                <FaCheck className="w-5 h-5 text-gray-500" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default OrderFulfillment;
