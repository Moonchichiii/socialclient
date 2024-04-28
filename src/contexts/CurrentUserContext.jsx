import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import axiosInstance from '../api/axiosDefaults';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import LoadingSpinner from '../components/LoadingSpinner';

export const CurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = Cookies.get("jwt_access_token");
        if (!accessToken) {
            setLoading(false);
            return;
        }

        const fetchUser = async () => {
            try {
                const { data } = await axiosInstance.get("/dj-rest-auth/user/");
                setCurrentUser(data);
            } catch (error) {
                console.log("Error fetching user:", error);
                navigate("/login");
            }
            setLoading(false);
        };

        fetchUser();
    }, [navigate]);
// Memoize the context value to avoid unnecessary re-renders
    const value = useMemo(() => ({
        currentUser,
        setCurrentUser,
        loading
    }), [currentUser, loading]);

    return (
        <CurrentUserContext.Provider value={value}>
            {!loading ? children : <LoadingSpinner />}
        </CurrentUserContext.Provider>
    );
};
