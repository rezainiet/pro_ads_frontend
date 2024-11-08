import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const SystemSettings = () => {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [language, setLanguage] = useState('English');

    const handleToggleNotification = () => setNotifications(!notifications);
    const handleToggleDarkMode = () => setDarkMode(!darkMode);
    const handleLanguageChange = (e) => setLanguage(e.target.value);

    return (
        <div>
            <Breadcrumb pageName="System Settings" />
            <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg dark:bg-boxdark">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">System Settings</h2>

                <div className="grid grid-cols-1 gap-6">
                    {/* Notifications */}
                    <div className="flex items-center justify-between">
                        <label className="text-gray-700 dark:text-white">Enable Notifications</label>
                        <button
                            onClick={handleToggleNotification}
                            className={`px-4 py-2 rounded-md shadow-md text-white ${notifications ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                                }`}
                        >
                            {notifications ? 'Enabled' : 'Disabled'}
                        </button>
                    </div>
                    <hr className="border-t border-gray-300 dark:border-strokedark" />

                    {/* Dark Mode */}
                    <div className="flex items-center justify-between">
                        <label className="text-gray-700 dark:text-white">Dark Mode</label>
                        <button
                            onClick={handleToggleDarkMode}
                            className={`px-4 py-2 rounded-md shadow-md text-white ${darkMode ? 'bg-primary hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600'
                                }`}
                        >
                            {darkMode ? 'Enabled' : 'Disabled'}
                        </button>
                    </div>
                    <hr className="border-t border-gray-300 dark:border-strokedark" />

                    {/* Language Preference */}
                    <div className="flex items-center justify-between">
                        <label className="text-gray-700 dark:text-white">Language</label>
                        <select
                            value={language}
                            onChange={handleLanguageChange}
                            className="px-4 py-2 border border-gray-300 rounded-md dark:border-strokedark dark:bg-boxdark dark:text-white"
                        >
                            <option value="English">English</option>
                            <option value="Spanish">Spanish</option>
                            <option value="French">French</option>
                        </select>
                    </div>
                    <hr className="border-t border-gray-300 dark:border-strokedark" />

                    {/* System Information */}
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">System Information</h3>
                        <ul className="list-disc pl-5 text-gray-700 dark:text-white">
                            <li>Version: 1.0.0</li>
                            <li>Last Update: Sep 10, 2024</li>
                            <li>License: Commercial</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SystemSettings;
