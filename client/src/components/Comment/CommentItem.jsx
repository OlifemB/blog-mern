import React from 'react';
import {Avatar, Divider, ListItem, ListItemAvatar, ListItemText, Skeleton} from "@mui/material";

const CommentItem = ({text, author, isLoading}) => {



    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt={text} src={author.avatarUrl || ''}/>
            </ListItemAvatar>


            {isLoading ? (
                <div style={{display: "flex", flexDirection: "column"}}>
                    <Skeleton variant="text" height={25} width={120}/>
                    <Skeleton variant="text" height={18} width={210}/>
                </div>
            ) : (
                <ListItemText
                    primary={author.fullName}
                    secondary={text}
                />
            )}
            <Divider/>
        </ListItem>
    );
}

export default CommentItem;