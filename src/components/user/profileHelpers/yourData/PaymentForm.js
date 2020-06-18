import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useDispatch } from 'react-redux';
import { setPayment } from '../../../../redux/actions'

export default function PaymentForm() {
  const dispatch = useDispatch();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const id = localStorage.getItem('userId')
  useEffect(() => {
    fetch(`profile/update/${id}`, {
      method: 'GET'
    }).then(result => result.json().then(data => { setLogin(data.login); setEmail(data.email) }))
  }, [])

  const handleInput = (e) => {
    const payment = {
      login,
      password,
      email,
    }
    dispatch(setPayment(payment))
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Учетные данные
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField required id="login" label="Логин" value={login} fullWidth onChange={e => setLogin(e.target.value)} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="email"
            label="Email"
            fullWidth
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="password" label="Пароль" type="password" value={password} fullWidth onChange={e => setPassword(e.target.value)} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField onChange={e => handleInput(e)}
            required
            id="passwordAgain"
            label="Пароль повторно"
            type="password"
            fullWidth
          />
        </Grid>
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}
