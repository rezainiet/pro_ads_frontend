import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const Profile = () => {
    const [profileData, setProfileData] = useState({
        name: 'John Doe',
        email: 'john@example.com',
        password: '',
        profilePicture: null,
    });

    const [errors, setErrors] = useState({}); // Validation errors

    // Handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    // Handle file upload for profile picture
    const handleFileChange = (e) => {
        setProfileData({ ...profileData, profilePicture: e.target.files[0] });
    };

    // Validate form data
    const validateForm = () => {
        const errors = {};
        if (!profileData.name) errors.name = 'Name is required';
        if (!profileData.email) errors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(profileData.email)) errors.email = 'Email is invalid';
        return errors;
    };

    // Handle form submission
    const handleProfileUpdate = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
            // Handle API request for profile update
            alert('Profile updated successfully!');
        } else {
            setErrors(formErrors);
        }
    };

    return (
        <div>
            <Breadcrumb pageName="Profile" />
            <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg dark:bg-boxdark">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Profile</h2>

                <form onSubmit={handleProfileUpdate}>
                    <div className="grid grid-cols-1 gap-6">
                        {/* Profile Picture Upload */}
                        <div>
                            <label className="block text-gray-700 dark:text-white mb-2">Profile Picture</label>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md dark:border-strokedark dark:bg-boxdark dark:text-white"
                            />
                            {profileData.profilePicture && (
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    Uploaded: {profileData.profilePicture.name}
                                </p>
                            )}
                        </div>

                        {/* Name Field */}
                        <div>
                            <label className="block text-gray-700 dark:text-white mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={profileData.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md dark:border-strokedark dark:bg-boxdark dark:text-white"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="block text-gray-700 dark:text-white mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={profileData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md dark:border-strokedark dark:bg-boxdark dark:text-white"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-gray-700 dark:text-white mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={profileData.password}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md dark:border-strokedark dark:bg-boxdark dark:text-white"
                                placeholder="Enter new password"
                            />
                        </div>

                        {/* Update Profile Button */}
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-primary text-white rounded-md shadow-md hover:bg-blue-600"
                            >
                                Update Profile
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
