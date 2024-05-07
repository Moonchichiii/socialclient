import React, { useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import InfinitePosts from './InfinitePosts';
import SearchBar from '../../components/SearchBar';
import axiosInstance from '../../api/axiosDefaults';
import LoadingSpinner from '../../components/LoadingSpinner';
import styles from './FeedPage.module.css';
const FeedPage = () => {


    const [searchQuery, setSearchQuery] = useState('');

    const fetchPosts = ({ pageParam = 1 }) =>
        axiosInstance.get(`/api/posts?page=${pageParam}&search=${searchQuery}`);

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery(['posts', searchQuery], fetchPosts, {
        getNextPageParam: (lastPage, pages) => lastPage.nextPage,
    });

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        <div className={styles.FeedPage}>
            <h1>Post 
                Feed 
            </h1>
            <SearchBar onSearch={handleSearch} />
            {status === 'loading' ? (
                <LoadingSpinner />
            ) : status === 'error' ? (
                <p>Error: {error.message}</p>
            ) : (
                <>


                    <InfinitePosts
                        data={data}
                        fetchNextPage={fetchNextPage}
                        hasNextPage={hasNextPage}
                        isFetchingNextPage={isFetchingNextPage}
                    />
                </>
            )}
        </div>
    );
};

export default FeedPage;