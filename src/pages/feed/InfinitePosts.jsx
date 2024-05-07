import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostCard from '../../components/PostCard';

const InfinitePosts = ({ data, fetchNextPage, hasNextPage, isFetchingNextPage }) => (
    <InfiniteScroll
        dataLength={data.pages.length * 10} 
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<h4>Loading...</h4>}
        endMessage={
            <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
            </p>
        }
    >
        {data.pages.map((page, i) => (
            page.data.map(post => <PostCard key={post.id} post={post} />)
        ))}
    </InfiniteScroll>
);

export default InfinitePosts;
