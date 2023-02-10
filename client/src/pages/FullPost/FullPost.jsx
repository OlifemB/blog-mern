import React, {useEffect, useState} from "react";
import {PostItem, AddComment, CommentBlock} from "../../components";
import {useParams} from "react-router-dom";
import ReactMarkdown from "react-markdown";
import {useDispatch, useSelector} from "react-redux";
import {PostSkeleton} from "../../components/Post/PostSkeleton";
import {fetchFullPost} from "../../redux/fullPost";


const FullPost = () => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const {data:fullPost, isLoading} = useSelector((state) => state.fullPost)
    const userData = useSelector((state) => state.user.data)


    useEffect(() => {
        dispatch(fetchFullPost(id))
    }, [])

    console.log(fullPost)


    if (isLoading)
        return <PostSkeleton/>

    return (
        <>
            <PostItem
                {...fullPost}
                isFullPost={true}
                isEditable={userData?._id === fullPost.author._id}
                isLoading={fullPost.isLoading}
            >
                <ReactMarkdown children={fullPost.text}/>
            </PostItem>

            <CommentBlock comments={fullPost.comments} isLoading={fullPost.isLoading}>
                <AddComment/>
            </CommentBlock>


        </>
    );
};

export default FullPost