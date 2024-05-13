import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosDefaults';
import { useMutation, useQueryClient } from 'react-query';

const usePosts = () => {
  const [data, setData] = useState({ pages: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
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
      onSuccess: () => queryClient.invalidateQueries('posts')
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
    publishPost
  };
};

export default usePosts;


