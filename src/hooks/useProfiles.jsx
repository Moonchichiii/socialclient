import { useState, useEffect, useContext } from 'react';
import axiosInstance from '../api/axiosDefaults';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const useProfiles = () => {
    const { currentUser } = useContext(CurrentUserContext);
    const [profiles, setProfiles] = useState([]);
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState(null);

    const fetchProfiles = async () => {
        try {
            const response = await axiosInstance.get('/api/profiles/');
            setProfiles(response.data);
        } catch (error) {
            console.error('Failed to fetch profiles!', error.response || error);
            setMessage('Failed to fetch any profiles!');
            setMessageType('danger');
        }
    };

    useEffect(() => {
        if (currentUser) {
            fetchProfiles();
        }
    }, [currentUser]);

    return {
        profiles,
        message,
        messageType,
    };
};

export default useProfiles;
