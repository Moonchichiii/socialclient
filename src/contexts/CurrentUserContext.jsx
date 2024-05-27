import React, { createContext, useState, useContext, useCallback, useMemo, useEffect } from 'react';
import axiosInstance from '../api/axiosDefaults';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from 'react-bootstrap/Alert';

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Using isLoading to maintain consistency
    const [message, setMessage] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const verifyAndFetchUser = useCallback(async () => {
        setIsLoading(true);
        const accessToken = Cookies.get("jwt_access_token");
        if (!accessToken) {
            setMessage("");
            setIsLoading(false);
            return;
        }
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            };
            await axiosInstance.post("/api/token/verify/", { token: accessToken }, config);
            const response = await axiosInstance.get("/api/current-user/", config);
            setCurrentUser(response.data);
            setMessage("");  // Clear any existing message
        } catch (error) {
            console.error("Error verifying token or fetching user data:", error);
            setError(error.toString());
            setMessage("Session ended. Please login again.");
            Cookies.remove("jwt_access_token", { path: '/' });
            Cookies.remove("jwt_refresh_token", { path: '/' });
            setCurrentUser(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        verifyAndFetchUser();
    }, [verifyAndFetchUser]);

    const value = useMemo(() => ({
        verifyAndFetchUser, 
        currentUser,
        setCurrentUser,        
        isLoading,
        setIsLoading,
        message,
        setMessage,
        error,
        setError
    }), [currentUser, isLoading, message, error]);

    return (
        <CurrentUserContext.Provider value={value}>
            {message && <Alert variant="danger">{message}</Alert>}
            {!isLoading ? children : <LoadingSpinner />}
        </CurrentUserContext.Provider>
    );
};

export const useCurrentUser = () => useContext(CurrentUserContext);
