import react, { useState, useEffect } from 'react';
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Autocomplete } from '@mui/material';
import {
  Typography,
  Paper,
  Grid,
  Button,
  CssBaseline,
  MenuItem,
  TextField,
  Select,
  InputLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import React from 'react';
import { Form, Field } from 'react-final-form';

const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  }
  return errors;
};

const onSubmit = async values => {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const TimePickerWrapper = (props) => {
  const {
    input: { name, onChange, value, ...restInput },
    meta,
    ...rest
  } = props;
  const showError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched;

  return (
    <TimePicker
      {...rest}
      name={name}
      helperText={showError ? meta.error || meta.submitError : undefined}
      error={showError}
      inputProps={restInput}
      onChange={onChange}
      value={value === '' ? null : value}
    />
  );
}

const DatePickerWrapper = (props) => {
  const {
    input: { name, onChange, value, ...restInput },
    meta,
    ...rest
  } = props;
  const showError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched;

  return (
    <DatePicker
      {...rest}
      name={name}
      helperText={showError ? meta.error || meta.submitError : undefined}
      error={showError}
      inputProps={restInput}
      onChange={onChange}
      value={value === '' ? null : value}
    />
  );
}

const CrearIncidenciaForm = (props) => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch("https://aninfo-psa-soporte.herokuapp.com/cliente")
      .then(res => res.json())
      .then(
        (data) => {
          setClients(data);
        }
      )
  }, [])

  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <CssBaseline />
      <Typography variant="h5" align="center" component="h2" gutterBottom>
        Crear Ticket
      </Typography>
      <Form
        onSubmit={onSubmit}
        initialValues={{ employed: true, stooge: 'larry' }}
        validate={validate}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Tipo de ticket</FormLabel>
                    <RadioGroup
                      aria-label="ticket"
                      defaultValue="consulta"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel value="consulta" control={<Radio />} label="Consulta" />
                      <FormControlLabel value="error" control={<Radio />} label="Error" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    required
                    name="Titulo"
                    component={TextField}
                    type="text"
                    label="Titulo del ticket"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="descripcion"
                    fullWidth
                    required
                    component={TextField}
                    multiline
                    type="text"
                    label="Descripción del ticket"
                  />
                </Grid>
                <Grid item xs={6} style={{ marginTop: 16 }}>
                  <InputLabel required variant="standard" htmlFor="estado">
                    Estado
                  </InputLabel>
                  <Select
                    required
                    fullWidth
                    name="estado"
                    labelId="demo-simple-select-label"
                    id="estado"
                    label="Estado"
                    formControlProps={{ fullWidth: true }}
                  // onChange={handleChange}
                  >
                    <MenuItem value="Iniciado">Iniciado</MenuItem>
                    <MenuItem value="NoIniciado">No Iniciado</MenuItem>
                    <MenuItem value="Finalizado"> Finalizado</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={6} item style={{ marginTop: 16 }}>
                  <InputLabel required variant="standard" htmlFor="prioridad">
                    Prioridad
                  </InputLabel>
                  <Select
                    required
                    fullWidth
                    name="prioridad"
                    labelId="demo-simple-select-label"
                    id="prioridad"
                    label="Prioridad"
                    formControlProps={{ fullWidth: true }}
                  // onChange={handleChange}
                  >
                    <MenuItem value="S1">S1</MenuItem>
                    <MenuItem value="S2">S2</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12} item style={{ marginTop: 16 }}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={clients}
                    getOptionLabel={(option) => option.razonSocial}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Cliente" />}
                  />
                </Grid>
                <MuiPickersUtilsProvider item style={{ marginTop: 16 }} utils={DateFnsUtils}>
                  <Grid item xs={6}>
                    <Field
                      name="fechaCreacion"
                      component={DatePickerWrapper}
                      fullWidth
                      margin="normal"
                      label="Fecha de creación"
                    />
                  </Grid>
                  <Grid item xs={6} />
                </MuiPickersUtilsProvider>
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={reset}
                    disabled={submitting || pristine}
                  >
                    Reset
                  </Button>
                </Grid>
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={submitting}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </form>
        )}
      />
    </div>
  );

};

export default CrearIncidenciaForm;
