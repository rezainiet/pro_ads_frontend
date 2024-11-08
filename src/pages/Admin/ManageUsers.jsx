import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

// Sample data for users
const usersData = [
    {
        userId: 'USR001',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'Admin',
    },
    {
        userId: 'USR002',
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'Manager',
    },
    {
        userId: 'USR003',
        name: 'Alice Johnson',
        email: 'alice@example.com',
        role: 'Staff',
    },
];

const ManageUsers = () => {
    const [users, setUsers] = useState(usersData);

    // Function to handle user editing
    const handleEditUser = (userId) => {
        // Placeholder for edit user functionality
        alert(`Edit user ${userId}`);
    };

    return (
        <div>
            <Breadcrumb pageName="Manage Users" />
            <div className="max-w-7xl mx-auto p-8 bg-white rounded-lg shadow-lg dark:bg-boxdark">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
                    Manage Users
                </h2>

                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse dark:border-strokedark">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-meta-4">
                                <th className="py-4 px-6 font-medium text-left text-gray-800 dark:text-white">
                                    User ID
                                </th>
                                <th className="py-4 px-6 font-medium text-left text-gray-800 dark:text-white">
                                    Name
                                </th>
                                <th className="py-4 px-6 font-medium text-left text-gray-800 dark:text-white">
                                    Email
                                </th>
                                <th className="py-4 px-6 font-medium text-left text-gray-800 dark:text-white">
                                    Role
                                </th>
                                <th className="py-4 px-6 font-medium text-center text-gray-800 dark:text-white">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map((user, index) => (
                                    <tr key={index} className="border-b dark:border-strokedark">
                                        <td className="py-4 px-6 text-gray-800 dark:text-white">
                                            {user.userId}
                                        </td>
                                        <td className="py-4 px-6 text-gray-800 dark:text-white">
                                            {user.name}
                                        </td>
                                        <td className="py-4 px-6 text-gray-800 dark:text-white">
                                            {user.email}
                                        </td>
                                        <td className="py-4 px-6 text-gray-800 dark:text-white">
                                            {user.role}
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            <button
                                                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                                                onClick={() => handleEditUser(user.userId)}
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="py-4 px-6 text-center text-gray-800 dark:text-white">
                                        No users available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;
