import React, {useState} from "react";
import {Avatar, Button, TextField} from "@mui/material";
import styles from "./AddComment.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {selectUserData} from "../../redux/user";
import {useParams} from "react-router-dom";
import {addComment} from "../../redux/post";

export const AddComment = () => {
    const {id} = useParams()
    const [text, setText] = useState('')
    const user = useSelector(selectUserData)
    const dispatch = useDispatch()

    const handleSubmit = () => {
        dispatch(addComment({
            text: text,
            postId: id,
            author: user,
        }))
        setText('')
    }

    return (
        <>
            <div className={styles.root}>
                <Avatar classes={{root: styles.avatar}}/>

                <div className={styles.form}>
                    <TextField
                        label="Написать комментарий"
                        variant="outlined"
                        maxRows={10}
                        multiline
                        fullWidth
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                    />

                    <Button variant="contained" onClick={handleSubmit}>Отправить</Button>
                </div>
            </div>
        </>
    );
};
