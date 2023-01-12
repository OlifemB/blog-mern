import React from 'react';
import {PostItem} from "./PostItem";
import {useSelector} from "react-redux";

export const PostList = ({posts}) => {
    const userData = useSelector((state) => state.auth.data)

    return posts.isLoading
      ? [...Array(5)].map((item, index) =>
        <PostItem key={index}
          isLoading={true}
        />
      )
      : posts.items.map(post =>
        <PostItem
          {...post}
          key={post._id}
          isLoading={false}
          commentsCount={0}
          isEditable={userData?._id === post.author._id}

        />
      )
};