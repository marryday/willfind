import React, { useState } from "react";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CropForm from '../../../Avatar'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { addPoint } from "../../../../redux/actions";
import Button from '@material-ui/core/Button';
//import './AvatarStyle.css'





const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#137cbd',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  },
});

// Inspired by blueprintjs
function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}



export default function AddressForm() {
  const url = useSelector(state => state.reducer.src)
  const dispatch = useDispatch();
  const history = useHistory();
  const [authorName, setAuthorName] = useState("");
  const [authorTel, setTel] = useState("");
  const [name, setName] = useState("");
  const [terrain, setTerrain] = useState("");
  const [img, setImg] = useState("");
  const [birthday, setBirthday] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [health, setHealth] = useState("");
  const [clothes, setClothes] = useState("");
  const [stuff, setStuff] = useState("");
  const [more, setMore] = useState("");
  const [specificMarks, setSpecificMarks] = useState("");
  const [value, setValue] = React.useState('Male');
  const [searchQuery, SetSearchQuery] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };


  const handleInput = (event) => {
    SetSearchQuery(event.target.value);
  };

  const submitHandler = async (e) => {
    console.log("123");
    try {


      // const formData = new FormData();
      // formData.append("file", img);
      // const res = await (
      //   await fetch("/upload", {
      //     method: "POST",
      //     body: formData,
      //   })
      // ).json()


      const result = await (
        await fetch("/upload/missedperson", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            authorName: authorName,
            authorTel: authorTel,
            name: name,
            terrain: terrain,
            addressOfLost: searchQuery,
            gender: value,
            img: url,
            birthday: birthday,
            description: description,
            health: health,
            clothes: clothes,
            stuff: stuff,
            more: more,
            specificMarks: specificMarks,
            time,
            author: localStorage.getItem("userId"),
          }),
        })
      ).json();
      dispatch(addPoint(searchQuery, result._id));
    } catch (e) {
      console.error(e.message)
    }
    // if (result.ok === "ok") {
    //   history.goBack();
    // }

  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Информация о пропавшем
      </Typography>


      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            required

            id="description"
            name="description"
            label="Заявитель: ФИО, степень родства (обязательно)"
            onChange={(e) => setAuthorName(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required

            id="description"
            name="description"
            label="Контакты заявителя: телефон для связи (обязательно):"
            onChange={(e) => setTel(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} >
          <TextField
            required
            id="firstName"
            name="firstName"
            label="ФИО пропавшего (обязательно):"
            fullWidth
            onChange={(e) => setName(e.target.value)}
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Пол:</FormLabel>
            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
              <FormControlLabel value="Male" control={<StyledRadio />} label="Мужской" />
              <FormControlLabel value="Female" control={<StyledRadio />} label="Женский" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={5}>
          Дата рождения:<TextField id="date" name="date" type="date" label=""
            onChange={(e) => setBirthday(e.target.value)} fullWidth />
        </Grid>

        <Grid item xs={12} >
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Адрес пропажи"
            fullWidth
            onChange={handleInput}
            autoComplete="adress"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Местность пропажи:"
            fullWidth
            onChange={(e) => setTerrain(e.target.value)}
            autoComplete='off'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Время пропажи:"
            onChange={(e) => setTime(e.target.value)}
            fullWidth
            autoComplete="shipping address-line2"
          />
        </Grid>
        <Grid item xs={12} >
          <TextField
            required
            id="health"
            name="health"
            label="Обстоятельства пропажи:"
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} >
          <TextField
            required
            id="clothes"
            name="clothes"
            onChange={(e) => setHealth(e.target.value)}
            label="Состояние здоровья пропавшего:"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="stuff"
            name="stuff"
            label="Во что одет пропавший:"
            onChange={(e) => setClothes(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="specificMarks"
            name="specificMarks"
            label="Особые приметы"
            onChange={(e) => setSpecificMarks(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="description"
            name="description"
            label="Что у пропавшего было с собой:"
            onChange={(e) => setStuff(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="description"
            name="description"
            label="Дополнительная информация"
            onChange={(e) => setMore(e.target.value)}
            fullWidth
          />
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <TextField
            required
            type="file"
            id="img"
            name="img"
            label="Фотография"
            fullWidth
          />


        </Grid> */}
        <CropForm />
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => submitHandler(e)}
        >
          Создать
      </Button>
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}
