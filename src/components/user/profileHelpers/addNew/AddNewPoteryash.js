import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import AddressForm2 from './AddressForm2';
import PaymentForm from './PaymentForm';
import Review from './Review';

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

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Информация о пропавшем', 'Информация о заявителе'/* , 'Итого' */];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    // case 2:
    //   return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

export default function Checkout() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const [authorName, setAuthorName] = useState('')
  const [authorTel, setTel] = useState('')
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [placeOfLive, setPlaceOfLive] = useState('');
  const [placeOfLost, setPlaceOfLost] = useState('');
  const [birthday, setBirthday] = useState("");
  const [img, setImg] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [health, setHealth] = useState("");
  const [clothes, setClothes] = useState('')
  const [stuff, setStuff] = useState('');
  const [specificMarks, setSpecificMarks] = useState('')

  const submitHandler = async (e) => {
    console.log('123')
    try {
      const formData = new FormData();
      formData.append("file", img);
      const res = await (
        await fetch("/upload", {
          method: "POST",
          body: formData,
        })
      ).json();

      const result = await (await fetch('/upload/missedperson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          authorName: authorName,
          authorTel: authorTel,
          firstName: firstName,
          lastName: lastName,
          placeOfLive: placeOfLive,
          placeOfLost: placeOfLost,
          time: time,
          img: res.filePath,
          birthday: birthday,
          description: description,
          health: health,
          clothes: clothes,
          stuff: stuff,
          specificMarks: specificMarks
        })
      })).json()
    } catch (e) {
      console.error(e.message)
    }
  }


  return (
    <React.Fragment>
      <CssBaseline />
      {/* <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography>
        </Toolbar>
      </AppBar> */}
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Данные пропавшего
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Данные успешно сохранены.
                </Typography>
                <Typography variant="subtitle1">
                  Желаем пропавшему человеку скорее вернуться домой!
                </Typography>
              </React.Fragment>
            ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} className={classes.button}>
                        Назад
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Сохранить' : 'Далее'}
                    </Button>
                  </div>
                </React.Fragment>
              )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}
