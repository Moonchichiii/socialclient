import { useInfiniteQuery } from 'react-query';
import axiosInstance from '../api/axiosDefaults';

const fetchPosts = async ({ pageParam = 1, searchQuery }) => {
    const response = await axiosInstance.get(`/api/posts?page=${pageParam}&search=${searchQuery}`);
    return response.data.results ? response.data.results : [];
};

const usePosts = (searchQuery) => {
    return useInfiniteQuery('posts', ({ pageParam }) => fetchPosts({ pageParam, searchQuery }), {
        getNextPageParam: (lastPage) => lastPage.nextPage,
    });
};

export default usePosts;
