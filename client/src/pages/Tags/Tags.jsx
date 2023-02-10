import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Container, Grid} from "@mui/material";
import {CommentBlock, PostList, TagsBlock} from "../../components";
import axios from "../../utils/axios";
import {useDispatch, useSelector} from "react-redux";
import {fetchLastComments} from "../../redux/comment";
import {fetchTags} from "../../redux/tags";

let renderCount = 0

const Tags = () => {
    // console.log(`Render count: ${++renderCount}`)
    const dispatch = useDispatch();
    const {id} = useParams()
    const tags = useSelector(state => state?.tags)
    const comments = useSelector(state => state?.comments)
    const [isLoading, setIsLoading] = useState(true)
    const [posts, setPosts] = useState({items: []})

    console.log('tags', tags)


    useEffect(() => {
        axios.get(`/tags/${id}`).then(res => {
            setPosts({items: res.data})
            setIsLoading(false)
        }).catch((err) => {
            console.warn(err)
        })
    }, [id])


    useEffect(() => {
        dispatch(fetchTags())
        dispatch(fetchLastComments())
    }, [])


    if (isLoading)
        return 'posts loading'

    return (
        <Grid container spacing={4}>
            <Grid xs={8} item>
                <PostList posts={posts.items} isLoading={posts.isLoading}/>
            </Grid>

            <Grid xs={4} item>
                <TagsBlock tags={tags.items} isLoading={tags.isLoading}/>
                <CommentBlock comments={comments.items} isLoading={comments.isLoading}/>
            </Grid>
        </Grid>
    );
};

export default Tags