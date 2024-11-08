import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebaseInit';
import axios from 'axios';

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

const SignUpPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isError, setIsError] = useState('');
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError('');

    if (!name || !email || !password || !confirmPassword) {
      setIsError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setIsError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setIsError('Password should be at least 6 characters long');
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(email, password);
      if (result && result.user) {
        await updateProfile({ displayName: name });


        const userData = {
          uid: result.user.uid,
          balance: 0,
          name,
          email,
          password,
          createdAt: new Date(),
        }
        // Console log all data
        console.log('User data:', userData);

        // save user data to my own database
        const result4 = await axios.post('https://ads-agency-backend.vercel.app/register', userData);
        console.log(result4)
        // check if the request was successful
        if (result4.status === 200) {
          navigate('/');
          console.log('User data saved successfully');
        } else {
          console.error('Failed to save user data:', result4.statusText);
        }

      }
    } catch (err) {
      setIsError('Failed to create an account. Please try again.');
      console.error('Error creating account:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">
      <div className="max-w-md w-full space-y-8 p-10 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
        <div className="text-center">
          <svg className="mx-auto h-12 w-auto text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5.5 9.5A4.5 4.5 0 0110 5a4.5 4.5 0 014.5 4.5V15H15a1 1 0 010 2H5a1 1 0 010-2h.5v-5.5z" />
            <path d="M10 0a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z" />
          </svg>
          <h2 className="mt-6 text-3xl font-extrabold text-slate-900 dark:text-white">
            Create an account
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Sign up to get started
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
          />
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
          <Input
            label="Confirm Password"
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
          />

          {isError && <p className="text-sm text-red-500">{isError}</p>}
          {error && <p className="text-sm text-red-500">Error: {error.message}</p>}
          {updateError && <p className="text-sm text-red-500">Error updating profile: {updateError.message}</p>}

          <Button type="submit" disabled={loading || updating}>
            {loading || updating ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </>
            ) : (
              'Sign up'
            )}
          </Button>
        </form>

        <div className="text-center mt-4">
          <Link
            to="/auth/signin"
            className="text-sm font-medium text-primary hover:underline"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;