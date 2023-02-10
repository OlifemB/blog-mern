import React, {useEffect} from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuth, fetchLogin, selectIsAuth} from "../../redux/user";
import {Navigate} from "react-router-dom";

const Login = () => {
    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm({
        defaultValues: {
            email: 'admin@mail.com',
            password: 'admin'
        },
        mode: 'onChange'
    })

    const onSubmit = async (values) => {
        try {
            const data = await dispatch(fetchLogin(values))

            if (!data.payload) {
                return alert('Error Authorize')
            }
            if ('token' in data.payload)
                window.localStorage.setItem('token', data.payload.token)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(()=>{
        dispatch(fetchAuth())
    },[])


    if (isAuth) {
        return <Navigate to={"/"}/>
    }


    return (
        <Paper classes={{root: styles.root}}>
            <Typography classes={{root: styles.title}} variant="h5">
                Login
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={styles.field}
                    label="E-Mail"
                    fullWidth
                    type={"email"}
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    {...register('email', {required: 'Email'})}
                />

                <TextField
                    className={styles.field}
                    label="Password"
                    fullWidth
                    type={"password"}
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    {...register('password', {required: 'Password'})}
                />

                <Button
                    type={"submit"}
                    size="large"
                    variant="contained"
                    fullWidth
                    disabled={!isValid}
                >
                    Go
                </Button>
            </form>
        </Paper>
    );
};

export default Login