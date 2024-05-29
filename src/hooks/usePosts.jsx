import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosDefaults';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

const usePosts = () => {
  const [data, setData] = useState({ pages: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get('/api/posts');
        setData({ pages: [response.data.results] });
        setError(null);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
        setError(err);
      }
      setIsLoading(false);
    };

    fetchPosts();
  }, []);

  const onSearch = async (query) => {
    try {
      const response = await axiosInstance.get(`/api/posts/?q=${query}`);
      setData({ pages: [response.data.results] });
    } catch (error) {
      console.error('Search error:', error);
      setError(error);
    }
  };

  const editPost = useMutation(
    async ({ postId, updatedData }) => {
      const response = await axiosInstance.put(`/api/posts/${postId}/`, updatedData);
      return response.data;
    },
    {
      onSuccess: () => queryClient.invalidateQueries('posts')
    }
  );

  const deletePost = useMutation(
    async (postId) => {
      await axiosInstance.delete(`/api/posts/${postId}/`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('posts');
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          navigate('/feed');
        }, 2000);
      }
    }
  );

  const publishPost = useMutation(
    async (postId) => {
      await axiosInstance.put(`/api/posts/${postId}/publish/`);
    },
    {
      onSuccess: () => queryClient.invalidateQueries('posts')
    }
  );

  return {
    data,
    isLoading,
    error,
    editPost,
    deletePost,
    publishPost,
    onSearch,
    showAlert,
    setShowAlert
  };
};

export default usePosts;







