import {configureStore, applyMiddleware, createStore} from "@reduxjs/toolkit";
import logger from 'redux-logger'
import {postsReducer} from "./post";
import {userReducer} from "./user";
import {commentsReducer} from "./comment";
import {tagsReducer} from "./tags";
import {fullPostReducer} from "./fullPost";

const reducer = {
    posts: postsReducer,
    user: userReducer,
    tags: tagsReducer,
    comments: commentsReducer,
    fullPost: fullPostReducer
}

const store = configureStore({
    reducer,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store