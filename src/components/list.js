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
                    <img alt="Remy Sharp" src={item.image ? item.image : "https://zaborkin.ru/img/icon.png"} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${item.sex === "Male" ? 'Пропал' : item.sex === "Female" ? 'Пропала' : 'Пропал'}`}
                    secondary={
                      <Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >

                          {item.lastName} {item.firstName} {item.middleName}
                        </Typography>
                        <div>Состояние здоровья: {item.health}</div>
                        <div>Возраст: {item.ages ? item.ages : 'не известен'}</div>
                        <div>Местоположение: {item.addressOfLost}</div>
                      </Fragment>
                    }
                  />
                  <div className="dataListFind">Дата: {(item.createdAt).slice(0, 10)}</div>
                  <div className="btnListFind"><Link to={`/people/${item._id}`}>Подробнее</Link></div>
                </ListItem>
              </div>
            </Paper>
          </div>
        )}

      </div>
    </Fragment>
  )
}
