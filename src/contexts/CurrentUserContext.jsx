import React, { createContext, useState, useContext, useCallback, useMemo } from 'react';
import axiosInstance from '../api/axiosDefaults';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from 'react-bootstrap/Alert';

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const verifyAndFetchUser = useCallback(async () => {
        setLoading(true);
        const accessToken = Cookies.get("jwt_access_token");
        if (!accessToken) {
            setError("Access token not found.");
            setMessage("Session ended. Please login again.");
            setLoading(false);
            navigate("/login");
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
        } catch (error) {
            console.error("Error verifying token or fetching user data:", error);
            setError(error.toString());
            setMessage("Session ended. Please login again.");
            navigate("/login");
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    const value = useMemo(() => ({
        verifyAndFetchUser, 
        currentUser,
        setCurrentUser,        
        loading,
        setLoading,
        message,
        setMessage,
        error,
        setError
    }), [currentUser, loading, message, error]);

    return (
        <CurrentUserContext.Provider value={value}>
            {message && <Alert variant="danger">{message}</Alert>}
            {!loading ? children : <LoadingSpinner />}
        </CurrentUserContext.Provider>
    );
};

export const useCurrentUser = () => useContext(CurrentUserContext);
