import React from 'react';
import {PostItem} from "./PostItem";
import {PostSkeleton} from "./PostSkeleton";

export const PostList = ({posts, isLoading}) => {

    if (isLoading)
        return 'loading'

    return (
        posts.isLoading
            ? [...Array(5)].map((item, index) => <PostSkeleton key={item+index}/>)
            : posts.map(post =>
                <PostItem
                    {...post}
                    key={post._id}
                    isLoading={false}
                    // isEditable={user.data._id === post.author._id}
                />
            )
    )
};