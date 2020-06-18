import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useDispatch } from 'react-redux'
import {setAddress} from '../../../../redux/actions'
export default function AddressForm() {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('');
  const [searchQuery, SetSearchQuery] = useState("");
 
  const handleInput = (event) => {
    SetSearchQuery(event.target.value);
    const user = {
      name,
      lastName,
      address: searchQuery,
    }
    dispatch(setAddress(user))
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Имя и адрес
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="Имя"
            fullWidth
            autoComplete="given-name"
            onChange={e => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            onChange={e => setLastName(e.target.value)}
            id="lastName"
            name="lastName"
            label="Фамилия"
            fullWidth
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={(e) => handleInput(e)}
            required
            id="address1"
            name="address1"
            label="Адрес"
            fullWidth
            autoComplete="shipping address-line1"
          />
        </Grid>
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
