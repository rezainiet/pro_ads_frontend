import React, { useState } from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebaseInit';

const Input = ({ label, id, type, value, onChange, placeholder }) => (
    <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
        </label>
        <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
    </div>
);

const Button = ({ children, onClick, disabled, type = "button" }) => (
    <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
    >
        {children}
    </button>
);

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [isError, setIsError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();
    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsError('');
        setIsSuccess(false);

        if (!email) {
            setIsError('Please enter your email address');
            return;
        }

        try {
            const success = await sendPasswordResetEmail(email);
            if (success) {
                setIsSuccess(true);
                console.log('Password reset email sent to:', email);
            }
        } catch (err) {
            setIsError('Failed to send password reset email. Please try again.');
            console.error('Error sending password reset email:', err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="max-w-md w-full space-y-8 p-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <div className="text-center">
                    <svg className="mx-auto h-12 w-auto text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
                        Forgot Password
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Enter your email to reset your password
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <Input
                        label="Email address"
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />

                    {isError && <p className="text-sm text-red-500">{isError}</p>}
                    {error && <p className="text-sm text-red-500">Error: {error.message}</p>}
                    {isSuccess && (
                        <p className="text-sm text-green-500">
                            Password reset email sent. Please check your inbox.
                        </p>
                    )}

                    <Button type="submit" disabled={sending}>
                        {sending ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Sending...
                            </>
                        ) : (
                            'Reset Password'
                        )}
                    </Button>
                </form>

                <div className="text-center mt-4">
                    <Link
                        to="/auth/signin"
                        className="text-sm font-medium text-primary hover:underline"
                    >
                        Back to Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;