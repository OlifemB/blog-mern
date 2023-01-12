import React, {useEffect, useState} from "react";
import {PostItem, AddComment, CommentsBlock} from "../components";
import {useParams} from "react-router-dom";
import {commentsData} from "../data";
import axios from "../axios";
import ReactMarkdown from "react-markdown";

export const FullPost = () => {
    const [post, setPost] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const {id} = useParams()

    useEffect(() => {
        axios.get(`/posts/${id}`).then(res => {
            setPost(res.data)
            setIsLoading(false)
        }).catch((err) => {
            console.warn(err)
        })
    }, [])

    if (isLoading)
        return <PostItem isLoading={isLoading}/>

    return (
      <>
          <PostItem
            {...post}
            isLoading={isLoading}
            isFullPost={true}
            commentsCount={0}
          >
              <ReactMarkdown children={post.text}/>
          </PostItem>

          <CommentsBlock
            comments={commentsData}
            isLoading={false}
          >
              <AddComment/>
          </CommentsBlock>
      </>
    );
};
