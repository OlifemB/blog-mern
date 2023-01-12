import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {fetchLogin, selectIsAuth} from "../../redux/slices/auth";
import {Navigate} from "react-router-dom";

export const Login = () => {
    const isAuth = useSelector(selectIsAuth)
    const {
        register,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm({
        defaultValues: {
            email: 'admin@mail.com',
            password: 'adminadmin'
        },
        mode: 'onChange'
    })

    const dispatch = useDispatch()

    const onSubmit = async (values) => {
        try {
            const data = await dispatch(fetchLogin(values))

            if (!data.payload) {
                return alert('Error Authorize')
            }
            if ('token' in data.payload) {
                window.localStorage.setItem('token', data.payload.token)
            }
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
              Вход в аккаунт
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
                label="Пароль"
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
                  Войти
              </Button>
          </form>
      </Paper>
    );
};
