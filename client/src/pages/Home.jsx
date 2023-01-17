import React, {useEffect} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';


import {TagsBlock, CommentsBlock, PostList} from '../components';

import {useDispatch, useSelector} from "react-redux";
import {fetchPosts, fetchTags} from "../redux/slices/posts";
import {fetchComments} from "../redux/slices/comments";


export const Home = () => {
    const dispatch = useDispatch();
    const {posts, tags} = useSelector(state => state.posts)
    const comments = useSelector(state => state.comments)

    useEffect(() => {
        dispatch(fetchPosts())
        dispatch(fetchTags())
        dispatch(fetchComments())
    }, [])

    return (
      <>
          <Tabs style={{marginBottom: 15}} value={0}>
              <Tab label="Новые"/>
              <Tab label="Популярные"/>
          </Tabs>
          <Grid container spacing={4}>

              <Grid xs={8} item>
                  <PostList posts={posts}/>
              </Grid>

              <Grid xs={4} item>
                  <TagsBlock {...tags}/>
                  <CommentsBlock comments={comments.items} isLoading={comments.isLoading}
                  />
              </Grid>
          </Grid>
      </>
    );
};
