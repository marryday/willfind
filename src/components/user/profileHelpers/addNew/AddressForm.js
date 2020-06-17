import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function AddressForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Информация о пропавшем
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
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Фамилия"
            fullWidth
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Адрес проживания"
            fullWidth
            autoComplete="shipping address-line1"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Адрес пропажи"
            fullWidth
            autoComplete="shipping address-line2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="health"
            name="health"
            label="Состояние здоровья"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="date" name="date" type="date" label="" fullWidth />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="clothes"
            name="clothes"
            label="В чем был одет"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="stuff"
            name="stuff"
            label="Что было с собой"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="specificMarks"
            name="specificMarks"
            label="Особые приметы"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="description"
            name="description"
            label="Дополнительная информация"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            type="file"
            id="img"
            name="img"
            label="Фотография"
            fullWidth
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
