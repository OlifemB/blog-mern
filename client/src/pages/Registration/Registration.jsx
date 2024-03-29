import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import styles from './Registration.module.scss';
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {fetchRegister, selectIsAuth} from "../../redux/user";
import {Navigate} from "react-router-dom";

const Registration = () => {
    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: ''
        },
        mode: 'onChange'
    })

    const onSubmit = async (values) => {
        try {
            const data = await dispatch(fetchRegister(values))

            if (!data.payload) {
                return alert('Error Registration')
            }
            if ('token' in data.payload)
                window.localStorage.setItem('token', data.payload.token)
        } catch (err) {
            console.log(err)
        }
    }


    if (isAuth) {
        return <Navigate to={"/"}/>
    }


    return (
        <Paper classes={{root: styles.root}}>
            <Typography classes={{root: styles.title}} variant="h5">
                Registration
            </Typography>

            <div className={styles.avatar}>
                <Avatar sx={{width: 100, height: 100}}/>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={styles.field}
                    label="Name"
                    fullWidth
                    error={Boolean(errors.fullName?.message)}
                    helperText={errors.fullName?.message}
                    {...register('fullName', {required: 'Your name'})}
                />

                <TextField
                    className={styles.field}
                    label="E-Mail"
                    fullWidth
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

export default Registration
