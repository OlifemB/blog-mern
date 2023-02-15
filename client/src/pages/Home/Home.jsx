import React, {useEffect} from 'react';
import {Tabs, Tab, Grid, Container} from '@mui/material';

import {TagsBlock, CommentBlock, PostList} from 'src/components';

import {useDispatch, useSelector} from "react-redux";
import {fetchPosts} from "src/redux";
import {fetchLastComments, useGetCommentsQuery, useGetPostsQuery} from "src/redux";
import {fetchTags} from "src/redux/tags";


const Home = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state?.posts)
    const tags = useSelector(state => state?.tags)
    const comments = useSelector(state => state?.comments)
    const user = useSelector(state => state?.user)

    // const posts = useGetPostsQuery()

    console.log(posts)


    useEffect(() => {
        dispatch(fetchPosts())
        dispatch(fetchTags())
        dispatch(fetchLastComments())
    }, [])


    return (
        <>
            {/*<Tabs style={{marginBottom: 15}} value={0}>*/}
            {/*    <Tab label="Новые"/>*/}
            {/*    <Tab label="Популярные"/>*/}
            {/*</Tabs>*/}

            <Grid container spacing={4}>
                <Grid xs={8} item>
                    <PostList posts={posts.items} user={user} isLoading={posts.isLoading}/>
                </Grid>

                <Grid xs={4} item>
                    <TagsBlock tags={tags.items} isLoading={tags.isLoading}/>
                    <CommentBlock comments={comments.items} isLoading={comments.isLoading}/>
                </Grid>
            </Grid>
        </>
    );
};

export default Home
