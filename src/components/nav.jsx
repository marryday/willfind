import React from 'react';
import { useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { logoutSaga } from "../actionCreators/actionCreatorSaga";
import Toogle from "./toogle";
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
              <Button><Link to='/map' className="aNav">MAP</Link></Button>
              <Link to='/profile' className="aNav">{userName} </Link>
              <Link to='/profile/logout' className="aNav" onClick={() => dispatch(logoutSaga())}>LOGOUT</Link>
              {/* <Toogle /> */}
            </> :
            <>
              <Link to='/map' className="aNav" color="inherit">MAP</Link>
              <Link to='/login' className="aNav" color="inherit">LOGIN</Link>
              {/* <Toogle /> */}
            </>}
        </Toolbar>
      </AppBar>
    </div>
  );
}
