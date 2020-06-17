import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './profileHelpers/listItems';
import Chart from './profileHelpers/Chart';
import Deposits from './profileHelpers/Deposits';
import Orders from './profileHelpers/Orders';
import Checkout from './profileHelpers/yourData/Checkout';
import CreateMissed from '../CreateMissed';
import Map from '../map';
import AddNewPoteryah from './profileHelpers/addNew/AddNewPoteryash';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  fixedPaddings: {
    margin: theme.spacing(2),
  }
}));

export const Profile = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const state = useSelector((state) => state);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [stat, setStat] = useState(true);
  const [search, setSearch] = useState(true);
  const [found, setFound] = useState(true);
  const [newone, setNewone] = useState(false);
  const [poteryashki, setPoteryashki] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const [yourData, setYourData] = useState(false);


  const handleOpenDashboard = () => {
    setNewone(false);
    setPoteryashki(false);
    setAddNew(false);
    setYourData(false);
    setStat(true);
    setSearch(true);
    setFound(true);
  }

  const handleOpenNewOne = () => {
    setPoteryashki(false);
    setAddNew(false);
    setYourData(false);
    setStat(false);
    setSearch(false);
    setFound(false);
    setNewone(true);
  }

  const handleOpenPoteryashki = () => {
    setAddNew(false);
    setYourData(false);
    setStat(false);
    setSearch(false);
    setFound(false);
    setNewone(false);
    setPoteryashki(true);
  }

  const handleOpenAddNew = () => {
    setYourData(false);
    setStat(false);
    setSearch(false);
    setFound(false);
    setPoteryashki(false);
    setNewone(false);
    setAddNew(true);
  }

  const handleOpenYourData = () => {
    setNewone(false);
    setPoteryashki(false);
    setAddNew(false);
    setStat(false);
    setSearch(false);
    setFound(false);
    setYourData(true);
  }

  const objForLists = {
    handleOpenDashboard,
    handleOpenNewOne,
    handleOpenPoteryashki,
    handleOpenAddNew,
    handleOpenYourData,
  }
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/*<AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>*/}
      {/*  <Toolbar className={classes.toolbar}>*/}
      {/*    <IconButton*/}
      {/*      edge="start"*/}
      {/*      color="inherit"*/}
      {/*      aria-label="open drawer"*/}
      {/*      onClick={handleDrawerOpen}*/}
      {/*      className={clsx(classes.menuButton, open && classes.menuButtonHidden)}*/}
      {/*    >*/}
      {/*      <MenuIcon />*/}
      {/*    </IconButton>*/}
      {/*    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>*/}
      {/*      Dashboard*/}
      {/*    </Typography>*/}
      {/*    <IconButton color="inherit">*/}
      {/*      <Badge badgeContent={4} color="secondary">*/}
      {/*        <NotificationsIcon />*/}
      {/*      </Badge>*/}
      {/*    </IconButton>*/}
      {/*  </Toolbar>*/}
      {/*</AppBar>*/}
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >

        <div className={classes.toolbarIcon}>
          <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems(objForLists)}</List>
        <Divider />
        {/*<List>{secondaryListItems}</List>*/}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            {stat ? <Grid item xs={12} md={8} lg={9}><Paper className={fixedHeightPaper}><Chart /></Paper></Grid> : null}
            {/* Recent Deposits */}
            {search ? <Grid item xs={12} md={4} lg={3}><Paper className={fixedHeightPaper}><Deposits /></Paper></Grid> : null}

            {/* Recent Orders */}
            {found ? <Grid item xs={12}><Paper className={classes.paper}><Orders /></Paper></Grid> : null}
            {yourData ? <Grid item xs={12} md={4} lg={3}><Paper className={classes.fixedPaddings}><Checkout /></Paper></Grid> : null}
            {addNew ? <Grid item xs={12} md={4} lg={3}><Paper className={classes.fixedPaddings}><AddNewPoteryah /></Paper></Grid> : null}
            {poteryashki ? <Grid item xs={12} md={4} lg={3}><Paper className={classes.fixedPaddings}><Map /></Paper></Grid> : null}
          </Grid>
        </Container>
        <CreateMissed />
      </main>
    </div>
  );
}
