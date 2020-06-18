import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

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

export default () => {
  const [ppl, setPpl] = useState([]);
  const classes = useStyles()

  useEffect(() => {
    fetch("/upload/missedpeople").then((result) =>
      result.json().then((response) => {
        setPpl(response.ppl);
        console.log(response.ppl);
      })
    );
  }, []);

  const getAges = (year) =>{ 
    console.log(year);
    return (new Date().getFullYear() - Number(year))
  }

  if (ppl.length > 0) {
    return (
      ppl.map(person => <div className="oneListFind">
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <img
            alt="Remy Sharp"
            src={process.env.PUBLIC_URL + person.image}
          />
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
                {person.firstName} {person.middleName} {person.lastName}
              </Typography>
              <div>{getAges(String(person.birthDate).slice(0,4))}</div>
              <div>Местоположение: {person.addressOfLost} </div>
            </Fragment>
          }
        />
        <div className="dataListFind">Дата: {(person.createdAt).slice(0,10)} </div>
        <div className="btnListFind">
          <Link to={{ pathname: `people/${person._id}`}}>Подробнее</Link>
        </div>
      </ListItem>
    </div>
  ) )
     
  } else {
    return <p>Загрузка ...</p>;
  }
};
