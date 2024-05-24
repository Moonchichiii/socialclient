import React, { createContext, useState, useContext, useCallback, useMemo, useEffect } from 'react';
import axiosInstance from '../api/axiosDefaults';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from 'react-bootstrap/Alert';

export const CurrentUserContext = createContext();

const INACTIVITY = 3 * 6  * 1000; 
const INTERVAL = 5 * 60 * 1000; 

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

    useEffect(() => {
        let inactivityTimer;
        let heartbeatTimer;

        const resetInactivityTimer = () => {
            clearTimeout(inactivityTimer);
            inactivityTimer = setTimeout(logout, INACTIVITY);
        };

        const logout = () => {
            Cookies.remove("jwt_access_token", { path: '/' });
            Cookies.remove("jwt_refresh_token", { path: '/' });
            setCurrentUser(null);
            setMessage("Session ended due to inactivity. Please login again.");
            navigate("/login");
        };

        const startHeartbeat = () => {
            heartbeatTimer = setInterval(() => {
                verifyAndFetchUser();
            }, INTERVAL);
        };

        window.addEventListener('mousemove', resetInactivityTimer);
        window.addEventListener('keypress', resetInactivityTimer);
      
        resetInactivityTimer();
        startHeartbeat();

        return () => {
            clearTimeout(inactivityTimer);
            clearInterval(heartbeatTimer);
            window.removeEventListener('mousemove', resetInactivityTimer);
            window.removeEventListener('keypress', resetInactivityTimer);
            
        };
    }, [navigate, verifyAndFetchUser]);

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
