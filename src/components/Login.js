import React, { Fragment } from "react";
//import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { loginSaga } from "../actionCreators/actionCreatorSaga";

import { Button, Avatar, CssBaseline, TextField, Link, Grid, Box, Typography, makeStyles, Container } from '@material-ui/core';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Copyright from "./Copyright";

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

export default function Login() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const onChangeInputEmail = (event) => {
    const value = event.target.value;
    state.email = value;
  };
  const onChangeInputPassword = (event) => {
    const value = event.target.value;
    state.password = value;
  };

  return (
    <Fragment>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={"classes.paper}"} >
          <Avatar className={useStyles.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Войти
          </Typography>
          <form className="loginForm" noValidate>
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
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => dispatch(loginSaga(state.email, state.password))}
            >
              Войти
          </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Забыли пароль?
              </Link>
              </Grid>
              <Grid item>
                <Link href="/registration" variant="body2">
                  Нет аккаунта? Зарегистрируйтесь.
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </Fragment>
  );
}
