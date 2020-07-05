import React from 'react';
import { Button, Avatar, CssBaseline, TextField, Box, Typography, makeStyles, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Copyright from "./Copyright";
import { useSelector, useDispatch } from "react-redux";
import { registerSaga } from "../actionCreators/actionCreatorSaga";
import AlertComponent from "../components/Alert"



export default function RegisterUser() {
  const state = useSelector((state) => state);
  const errorMessage = useSelector((state) => state.appReducer.alert);
  const dispatch = useDispatch();

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const onChangeInputName = (event) => {
    const value = event.target.value;
    state.name = value;
  };
  const onChangeInputEmail = (event) => {
    const value = event.target.value;
    state.email = value;
  };
  const onChangeInputPassword = (event) => {
    const value = event.target.value;
    state.password = value;
  };
  const onChangeInputRepeadPassword = (event) => {
    const value = event.target.value;
    state.repeadPassword = value;
  };

  return (
    <>
      <Container component="main" maxWidth="xs">

        <CssBaseline />
        <div className={"classes.paper}"} >
          <Avatar className={useStyles.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          {errorMessage ? <AlertComponent message={errorMessage} /> : <></>}
          <Typography component="h1" variant="h5">
            Регистрация
          </Typography>
          <form className="loginForm" noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="exampleEmail"
              label="Name"
              name="nameUser"
              autoComplete="name"
              autoFocus
              onChange={onChangeInputName}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="exampleEmail"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={onChangeInputEmail}

            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="examplePassword"
              autoComplete="current-password"
              onChange={onChangeInputPassword}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Repead Password"
              type="password"
              id="examplePassword"
              autoComplete="current-password"
              onChange={onChangeInputRepeadPassword}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => {
                console.log(state.name, state.email, state.password, state.repeadPassword);
                dispatch(registerSaga(state.name, state.email, state.password, state.repeadPassword))
              }}
            >
              Зарегистироваться
          </Button>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>

      </Container>
    </>
  );
}
