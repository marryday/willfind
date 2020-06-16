import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import Avatar from "@material-ui/core/Avatar";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  depositContext: {
    flex: 1,
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
}));

export default function Deposits() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Ваш поиск</Title>

      <Typography color="textSecondary" className={classes.depositContext}>
        <Avatar alt="Иванов Адам" src="https://i.ibb.co/HPnBx0F/2020-06-12-18-33-18.png" className={classes.large} />
      </Typography>
      <Typography component="p" variant="h6">
        Иванов Адам
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Подробнее
        </Link>
      </div>
    </React.Fragment>
  );
}