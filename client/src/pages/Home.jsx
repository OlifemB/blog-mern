import React, {useEffect} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';


import {TagsBlock, CommentsBlock, PostList} from '../components';

import {useDispatch, useSelector} from "react-redux";
import {fetchPosts, fetchTags} from "../redux/slices/posts";

import {commentsData, tagsData} from "../data";


export const Home = () => {
    const dispatch = useDispatch();
    const {posts, tags} = useSelector(state => state.posts)

    useEffect(() => {
        dispatch(fetchPosts())
        dispatch(fetchTags())
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
                  <CommentsBlock comments={commentsData} isLoading={false}
                  />
              </Grid>
          </Grid>
      </>
    );
};
