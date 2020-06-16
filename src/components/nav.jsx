import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { logoutSaga } from "../actionCreators/actionCreatorSaga";
import Toogle from "./toogle";
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const userSession = localStorage.getItem("userSession");
const userName = localStorage.getItem("userName");

export default function ButtonAppBar() {
  const classes = useStyles();
  //const state = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            <Link to='/' className="aNav">WILL FIND</Link>
          </Typography>
          {userSession ?
            <>
              <Link to='/map' className="aNav">MAP</Link>
              <Link to='/profile' className="aNav">{userName} </Link>
              <Link to='/profile/logout' className="aNav" onClick={() => dispatch(logoutSaga())}>LOGOUT</Link>
              <Toogle />
            </> :
            <>
              <Button href='/map' color="inherit">map</Button>
              <Button href='/login' color="inherit">Login</Button>
              <Toogle />
            </>}
        </Toolbar>
      </AppBar>
    </div>
  );
}
