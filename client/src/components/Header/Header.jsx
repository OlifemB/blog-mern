import React from 'react';
import Button from '@mui/material/Button';
import styles from './Header.module.scss';
import {Container} from '@mui/material';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectIsAuth} from "../../redux/slices/auth";

export const Header = () => {
    const isAuth = useSelector(selectIsAuth)
    const userData = useSelector((state) => state.auth.data)
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
    };

    return (
      <div className={styles.root}>
          <Container maxWidth="lg">
              <div className={styles.inner}>
                  <Link className={styles.logo} to="/">
                      <div>WEB BLOG</div>
                  </Link>
                  <div className={styles.buttons}>
                      {isAuth ? (
                        <>
                            <Button>{userData.fullName}</Button>
                            <Link to="/add-post">
                                <Button variant="contained">Create post</Button>
                            </Link>
                            <Button onClick={logoutHandler} variant="contained" color="error">
                                Log out
                            </Button>
                        </>
                      ) : (
                        <>
                            <Link to="/login">
                                <Button variant="outlined">Login</Button>
                            </Link>
                            <Link to="/register">
                                <Button variant="contained">Create an account</Button>
                            </Link>
                        </>
                      )}
                  </div>
              </div>
          </Container>
      </div>
    );
};
