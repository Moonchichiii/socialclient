import React from 'react';
import usePosts from '../../hooks/usePosts';
import InfinitePosts from './InfinitePosts';
import LoadingSpinner from '../../components/LoadingSpinner';
import styles from './FeedPage.module.css';

const FeedPage = () => {
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status
    } = usePosts();

    return (
        <main>
        <div className={styles.FeedPage}>
            <h1>Post Feed</h1>
            {status === 'loading' && <LoadingSpinner />}
            {status === 'error' && <p>Error: {error?.message}</p>}
            {status === 'success' && data && (
                <div className={styles.PostsGrid}>
                    <InfinitePosts
                        data={data}
                        fetchNextPage={fetchNextPage}
                        hasNextPage={hasNextPage}
                        isFetchingNextPage={isFetchingNextPage}
                    />
                </div>
            )}
        </div>
        </main>
    );
};

export default FeedPage;



