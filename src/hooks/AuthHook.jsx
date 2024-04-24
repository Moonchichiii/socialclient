import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../api/axiosDefaults';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Cookies from "js-cookie";
// Function to handle user authentication
export function useAuth() {
    const { setCurrentUser } = useContext(CurrentUserContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // Function to set cookies with access and refresh tokens
    const setCookies = (accessToken, refreshToken) => {
        Cookies.set("jwt_access_token", accessToken, cookieOptions.accessTokenOpts);
        Cookies.set("jwt_refresh_token", refreshToken, cookieOptions.refreshTokenOpts);
    };

    // Function to handle user login
    const login = async (username, password) => {
        setIsLoading(true);
        try {
            const { data } = await axiosInstance.post("/api/token/", { username, password });
            setCurrentUser(data.user, data.access, data.refresh);
            setCookies(data.access, data.refresh);      
            navigate('/dashboard');
        } catch (err) {
                setError("Oops! Failed to log in, Please try again.");
                setIsLoading(false);
        }
    };

    // Function to handle user registration
    const register = async (formData) => {
        setIsLoading(true);
        try {
            const { data } = await axiosInstance.post("/api/register/", formData);
            setCookies(data.access_token, data.refresh_token);
            setCurrentUser(data.user, data.access_token, data.refresh_token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data || "Failed to register.");
            setIsLoading(false);
        }
    };

    // Function to handle user logout
    const logout = () =>  {    
        Cookies.remove("jwt_access_token", { path: "/" });
        Cookies.remove("jwt_refresh_token", { path: "/" });
        Cookies.remove("csrftoken", { path: "/" });
        Cookies.remove("sessionid",{ path: "/" });
        Cookies.remove("messages",{ path: "/" }); 
        setCurrentUser(null);
        navigate("/");
    };

    return { login, register, logout, isLoading, error };
}
