import React, { Fragment } from "react";
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
  const classes = useStyles();

  return (
    <Fragment>
      <div className="mainListFind ">
        <div className="oneListFind">
          <Paper elevation={3}>
            <ListItem alignItems="flex-start" >
              <ListItemAvatar>
                <img alt="Remy Sharp" src="https://b.radikal.ru/b08/2006/0a/63f66423a42e.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Пропал(а)"
                secondary={
                  <Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      Иванов Иван Иванович
              </Typography>
                    <div>Возраст: 92</div>
                    <div>Местоположение: г. Москва ВАО, Вешняковский район </div>
                  </Fragment>
                }
              />
              <div className="dataListFind">Дата: 15.07.18 </div>
              <div className="btnListFind"><Link to='/chat'>Подробнее</Link></div>
            </ListItem>
          </Paper>
        </div>

        <div className="oneListFind">
          <ListItem alignItems="flex-start" >
            <ListItemAvatar>
              <img alt="Remy Sharp" src="https://b.radikal.ru/b08/2006/0a/63f66423a42e.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Пропал(а)"
              secondary={
                <Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    Иванов Иван Иванович
              </Typography>
                  <div>Возраст: 92</div>
                  <div>Местоположение: г. Москва ВАО, Вешняковский район </div>
                </Fragment>
              }
            /><div className="dataListFind">Дата: 15.07.18 </div><div className="btnListFind"> <Link>Подробнее</Link></div>
          </ListItem>
        </div>

        <div className="oneListFind">
          <ListItem alignItems="flex-start" >
            <ListItemAvatar>
              <img alt="Remy Sharp" src="https://b.radikal.ru/b08/2006/0a/63f66423a42e.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Пропал(а)"
              secondary={
                <Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    Иванов Иван Иванович
              </Typography>
                  <div>Возраст: 92</div>
                  <div>Местоположение: г. Москва ВАО, Вешняковский район </div>
                </Fragment>
              }
            /><div className="dataListFind">Дата: 15.07.18 </div><div className="btnListFind"> <Link>Подробнее</Link></div>
          </ListItem>
        </div>

        <div className="oneListFind">
          <ListItem alignItems="flex-start" >
            <ListItemAvatar>
              <img alt="Remy Sharp" src="https://c.radikal.ru/c23/2006/58/5877094dc077.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Пропал(а)"
              secondary={
                <Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    Иванов Иван Иванович
              </Typography>
                  <div>Возраст: 92</div>
                  <div>Местоположение: г. Москва ВАО, Вешняковский район </div>
                </Fragment>
              }
            /><div className="dataListFind">Дата: 15.07.18 </div><div className="btnListFind"> <Link>Подробнее</Link></div>
          </ListItem>
        </div>

        <div className="oneListFind">
          <ListItem alignItems="flex-start" >
            <ListItemAvatar>
              <img alt="Remy Sharp" src="https://b.radikal.ru/b08/2006/0a/63f66423a42e.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Пропал(а)"
              secondary={
                <Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    Иванов Иван Иванович
              </Typography>
                  <div>Возраст: 92</div>
                  <div>Местоположение: г. Москва ВАО, Вешняковский район </div>
                </Fragment>
              }
            /><div className="dataListFind">Дата: 15.07.18 </div><div className="btnListFind"> <Link>Подробнее</Link></div>
          </ListItem>
        </div>

        <div className="oneListFind">
          <ListItem alignItems="flex-start" >
            <ListItemAvatar>
              <img alt="Remy Sharp" src="http://info-la.ru/photo/84226_1919322455.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Пропал(а)"
              secondary={
                <Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    Васьков Васёк Васькович
              </Typography>
                  <div>Возраст: 15</div>
                  <div>Местоположение: г. Рязань </div>
                </Fragment>
              }
            /><div className="dataListFind">Дата: 15.11.17 </div><div className="btnListFind"> <Link>Подробнее</Link></div>
          </ListItem>
        </div>



      </div>
    </Fragment>
  )
}
