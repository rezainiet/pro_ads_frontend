import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebaseInit';
import useUser from '../../hooks/useUser';

const Input = ({ label, id, type, value, onChange, placeholder }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-primary focus:border-primary dark:bg-slate-700 dark:border-slate-600 dark:text-white"
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

const LoginPage = () => {
  const { userData } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState('');
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError('');
    if (email && password) {
      try {
        await signInWithEmailAndPassword(email, password);
      } catch (err) {
        setIsError('Failed to sign in. Please check your credentials.');
      }
    } else {
      setIsError('Please fill in all fields');
    }
  };

  if (user || userData?.uid) {
    navigate('/');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">
      <div className="max-w-md w-full space-y-8 p-10 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
        <div className="text-center">
          <svg className="mx-auto h-12 w-auto text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
          </svg>
          <h2 className="mt-6 text-3xl font-extrabold text-slate-900 dark:text-white">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Sign in to your account
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
          <Input
            label="Password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />

          {isError && <p className="text-sm text-red-500">{isError}</p>}
          {error && <p className="text-sm text-red-500">Error: {error.message}</p>}

          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </Button>
        </form>

        <div className="flex items-center justify-between mt-4">
          <Link
            to="/auth/signup"
            className="text-sm font-medium text-primary hover:underline"
          >
            Don't have an account? Sign up
          </Link>
          <Link
            to="/auth/forgot-password"
            className="text-sm font-medium text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;