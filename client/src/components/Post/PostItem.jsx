import React from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import styles from './Post.module.scss';
import {UserInfo} from '../UserInfo/UserInfo';
import {PostSkeleton} from './PostSkeleton';
import {Link, Navigate, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {removePost} from "../../redux/post";

export const PostItem = (props) => {
    const {
        _id,
        title,
        createdAt,
        imageUrl,
        author,
        viewsCount,
        comments,
        tags,
        children,
        isFullPost,
        isLoading,
        isEditable
    } = props

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const onClickRemove = async () => {
        try {
            if (window.confirm('Delete post?')) {
                if (isFullPost)
                    navigate(`/`)
                await dispatch(removePost(_id))
            }
        } catch (err) {
            console.warn(err)
        }
    };

    return (
        <div className={clsx(styles.root, {[styles.rootFull]: isFullPost})}>
            {isEditable && (
                <div className={styles.editButtons}>
                    <Link to={`/posts/${_id}/edit`}>
                        <IconButton color="primary">
                            <EditIcon/>
                        </IconButton>
                    </Link>

                    <IconButton onClick={onClickRemove} color="secondary">
                        <DeleteIcon/>
                    </IconButton>
                </div>
            )}

            {imageUrl && (
                <div className={styles.imageWrapper}>
                    <img
                        className={clsx(styles.image, {[styles.imageFull]: isFullPost})}
                        src={`http://localhost:5000${imageUrl}`}
                        alt={title}
                    />
                </div>
            )}

            <div className={styles.wrapper}>
                <UserInfo {...author} additionalText={createdAt}/>

                <div className={styles.indention}>
                    <h2 className={clsx(styles.title, {[styles.titleFull]: isFullPost})}>
                        {isFullPost ? title : <Link to={`/posts/${_id}`}>{title}</Link>}
                    </h2>

                    {tags[0]?.length > 0 && (
                        <ul className={styles.tags}>
                            {tags.map((name) => (
                                <li key={name}>
                                    <Link to={`/tags/${name}`}>#{name}</Link>
                                </li>
                            ))}
                        </ul>
                    )}

                    {children && <div className={styles.content}>{children}</div>}

                    <ul className={styles.postDetails}>
                        <li>
                            <EyeIcon/>
                            <span>{viewsCount}</span>
                        </li>
                        <li>
                            <CommentIcon/>
                            <span>{comments.length}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
