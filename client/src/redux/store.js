import {configureStore, applyMiddleware, createStore} from "@reduxjs/toolkit";
import logger from 'redux-logger'
import {postsReducer} from "./posts";
import {userReducer} from "./user";
import {commentsReducer} from "./comments";
import {tagsReducer} from "./tags";
import {fullPostReducer} from "./fullPost";
import {postsApi} from "./posts/posts.api";

const reducer = {
    posts: postsReducer,
    user: userReducer,
    tags: tagsReducer,
    comments: commentsReducer,
    fullPost: fullPostReducer,
    [postsApi.reducerPath]: postsApi.reducer,
}

const middlewares = (getDefaultMiddleware) => getDefaultMiddleware().concat(postsApi.middleware)


export const store = configureStore({
    reducer,
    middlewares,
})
