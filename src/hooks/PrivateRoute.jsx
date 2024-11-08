import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebaseInit';

const PrivateRoute = ({ children }) => {
    const [user, loading, error] = useAuthState(auth);
    const location = useLocation();

    if (loading) return <div>Loading...</div>;

    if (!user) {
        return <Navigate to="/auth/signin" state={{ from: location }} />;
    }

    return children; // Render children if the user is authenticated
};

export default PrivateRoute;
