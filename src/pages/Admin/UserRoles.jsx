import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

// Sample data for user roles
const userRolesData = [
    {
        roleId: 'ROLE001',
        roleName: 'Admin',
        description: 'Full access to all features and settings.',
    },
    {
        roleId: 'ROLE002',
        roleName: 'Manager',
        description: 'Access to inventory and sales management.',
    },
    {
        roleId: 'ROLE003',
        roleName: 'Staff',
        description: 'Limited access to order processing and stock management.',
    },
];

const UserRoles = () => {
    const [roles, setRoles] = useState(userRolesData);

    // Add new role (you can add form and logic for adding roles)
    const handleAddRole = () => {
        // Placeholder function for adding roles
        alert('Add new role functionality');
    };

    return (
        <div>
            <Breadcrumb pageName="User Roles" />
            <div className="max-w-7xl mx-auto p-8 bg-white rounded-lg shadow-lg dark:bg-boxdark">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
                    User Roles
                </h2>

                <div className="mb-6 flex justify-end gap-4">
                    <button
                        onClick={handleAddRole}
                        className="px-6 py-2 bg-primary text-white rounded-md shadow-md hover:bg-blue-600"
                    >
                        Add New Role
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse dark:border-strokedark">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-meta-4">
                                <th className="py-4 px-6 font-medium text-left text-gray-800 dark:text-white">
                                    Role ID
                                </th>
                                <th className="py-4 px-6 font-medium text-left text-gray-800 dark:text-white">
                                    Role Name
                                </th>
                                <th className="py-4 px-6 font-medium text-left text-gray-800 dark:text-white">
                                    Description
                                </th>
                                <th className="py-4 px-6 font-medium text-center text-gray-800 dark:text-white">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.length > 0 ? (
                                roles.map((role, index) => (
                                    <tr key={index} className="border-b dark:border-strokedark">
                                        <td className="py-4 px-6 text-gray-800 dark:text-white">
                                            {role.roleId}
                                        </td>
                                        <td className="py-4 px-6 text-gray-800 dark:text-white">
                                            {role.roleName}
                                        </td>
                                        <td className="py-4 px-6 text-gray-800 dark:text-white">
                                            {role.description}
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            <button className="px-4 py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600">
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="py-4 px-6 text-center text-gray-800 dark:text-white">
                                        No roles available.
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

export default UserRoles;
