import React from 'react';
import {List} from "@mui/material";
import CommentItem from "./CommentItem";

const CommentList = ({comments, isLoading}) => {

    if (isLoading)
        return 'loading'

    return (
        <List>
            {comments.map(comment => <CommentItem {...comment} key={comment._id}/>
            )}
        </List>
    );
};

export default CommentList;