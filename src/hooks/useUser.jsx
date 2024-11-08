import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebaseInit";
import axios from "axios";
import { useState, useEffect } from "react";

const useUser = () => {
    const [user, loading] = useAuthState(auth);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            // Fetch user data when the user is logged in
            const fetchUserData = async () => {
                try {
                    const res = await axios.get(`https://ads-agency-backend.vercel.app/getUser/${user.email}`);
                    setUserData(res.data);
                } catch (err) {
                    setError(err); // Set error state
                    console.error(err);
                }
            };

            fetchUserData();
        } else {
            setUserData(null); // Reset user data if not logged in
        }
    }, [user]); // Only run this effect when the user state changes

    return { userData, user, loading, error }; // Return the error as well
};

export default useUser;
