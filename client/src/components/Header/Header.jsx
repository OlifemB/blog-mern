import React, {useEffect} from 'react';
import Button from '@mui/material/Button';
import styles from './Header.module.scss';
import {Box, Container} from '@mui/material';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectIsAuth} from "../../redux/user";

export const Header = () => {
    const isAuth = useSelector(selectIsAuth)
    const userData = useSelector(state => state?.user.data)
    const dispatch = useDispatch()


    const logoutHandler = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
    };


    return (
        <Box className={styles.root}>
            <Container maxWidth="lg">
                <Box className={styles.inner}>
                    <Link className={styles.logo} to="/">
                        <div>WEB BLOG</div>
                    </Link>

                    <Box className={styles.buttons}>
                        {isAuth
                            ? <>
                                <Button>{userData.fullName}</Button>

                                <Link to="/add-post">
                                    <Button variant="contained">Create post</Button>
                                </Link>

                                <Button onClick={logoutHandler} variant="contained" color="error">
                                    Log out
                                </Button>
                            </>
                            : <>
                                <Link to="/login">
                                    <Button variant="outlined">Login</Button>
                                </Link>

                                <Link to="/register">
                                    <Button variant="contained">Create an account</Button>
                                </Link>
                            </>
                        }
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};
