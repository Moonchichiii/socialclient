import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostCard from '../../components/PostCard';
import LoadingSpinner from '../../components/LoadingSpinner';

const InfinitePosts = ({ data, fetchNextPage, hasNextPage }) => {
    if (!data || !data.pages) {
        return <div>Nothing to display!!!</div>;
    }
    return (
        <InfiniteScroll
            dataLength={data.pages.reduce((total, page) => total + page.length, 0)}
            next={fetchNextPage}
            hasMore={hasNextPage || false}
            loader={<LoadingSpinner />}
            endMessage={<p style={{ textAlign: 'center' }}><b>This is the End!!! You seen it all!!!!</b></p>}
        >
            {data.pages.map(page => page.map(post => (
                <PostCard key={post.id} post={post} />
            )))}
        </InfiniteScroll>
    );
}
export default InfinitePosts;
