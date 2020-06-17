import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function ListFind() {
  const state = useSelector((state) => state.mapReducer);
  const classes = useStyles();
  const getAges = (year) => {
    console.log(year);
    return (new Date().getFullYear() - Number(year))
  }
  return (
    <Fragment>
      <div className="mainListFind ">
        {state.points.map(item =>
          <div className="oneListFind">
            <Paper elevation={3}>
              <div className="oneListFindPaper">
                <ListItem alignItems="flex-start" >
                  <ListItemAvatar>
                    <img alt="Remy Sharp" src={item.image ? item.image : "https://ferrum-body.ru/wp-content/uploads/2017/03/3przq6v.jpg"} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${item.health} ${item.sex === "Male" ? 'Пропал мужчина' : item.sex === "Female" ? 'Пропала женщина' : 'Пропал'}`}
                    secondary={
                      <Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >

                          {item.firstName} {item.middleName} {item.lastName}
                        </Typography>
                        <div>Возраст: {item.birthDate ? getAges(String(item.birthDate).slice(0, 4)) : 'не известен'}</div>
                        <div>ЧУТЬ ПОЗЖЕ{item.addressOfLost}</div>
                      </Fragment>
                    }
                  />
                  <div className="dataListFind">Дата: {(item.createdAt).slice(0, 10)}</div>
                  <div className="btnListFind"><Link to={`/chat/${item._id}`}>Подробнее</Link></div>
                </ListItem>
              </div>
            </Paper>
          </div>
        )}

      </div>
    </Fragment>
  )
}
