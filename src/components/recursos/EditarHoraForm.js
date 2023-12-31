import react, { useState, useEffect } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { Autocomplete, NativeSelect } from '@mui/material';
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
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { useLocation, useHistory } from "react-router-dom";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

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
  await sleep(600);
  window.alert(JSON.stringify(values, 0, 2));
};

const EditarHoraForm = (props) => {
  const location = useLocation();
  const [proyecto, setProyecto] = useState(location.state.proyecto);
  const [tarea, setTarea] = useState(location.state.tarea);
  const [fecha, setFecha] = useState(location.state.fecha);
  const [horas, setHora] = useState(location.state.hora);
  const [id, setId] = useState(location.state.id);
  let history = useHistory();

  const editarHora = () => {
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(`https://api-recursos.herokuapp.com/recursos/ModificarHoras/${location.state.id}?cantidad_horas=${horas}`, requestOptions)
      .then(response => response.json())
      .then(history.push({
        pathname:'/consultar-horas',
        state: {
          id: location.state.id, 
          proyecto: location.state.proyecto,
          tarea: location.state.tarea,
          horas: horas,
          fecha: location.state.fecha
        }}))
   }

  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <CssBaseline />
      <Typography variant="h5" align="center" component="h2" gutterBottom>
        Editar Horas
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
                  <TextField
                    defaultValue={location.state.proyecto}
                    fullWidth
                    required
                    name="proyecto"
                    id="outlined-read-only-input"
                    InputProps={{
                      readOnly: true,
                    }}
                    label="Proyecto"
                    type="text"
                    onChange={(event) => setProyecto(event.target.value)}
                    
                  />
                </Grid>
                <Grid item xs={12} style={{ marginTop: 16 }}>
                  <TextField
                    defaultValue={location.state.tarea}
                    name="tarea"
                    fullWidth
                    required
                    multiline
                    type="text"
                    id="outlined-read-only-input"
                    InputProps={{
                      readOnly: true,
                    }}
                    label="Tarea"
                    onChange={(event) => setTarea(event.target.value)}
                  />
                </Grid>
                <LocalizationProvider item dateAdapter={AdapterDateFns}>
                    <Grid item style={{ marginTop: 32 }} xs={6}>
                      <MobileDatePicker
                        label="Fecha"
                        inputFormat="dd/MM/yyyy"
                        value={fecha}
                        defaultValue={location.state.fecha}
                        disabled
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Grid>
                    
                </LocalizationProvider>
                <Grid item xs={12}>
                  <TextField
                    defaultValue={location.state.horas}
                    fullWidth
                    required
                    name="hora"
                    onChange={(event) => setHora(event.target.value)}
                    multiline
                    label="Hora"
                    type="text"
                  />
                </Grid>
                    <Grid container xs={12} justifyContent="flex-end" style={{ padding:10 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="button"
                        onClick={() => editarHora()}
                    >
                        Editar
                    </Button>                    
                    </Grid>
              </Grid>
            </Paper>
          </form>
        )
        }
      />
    </div >
  );

};

export default EditarHoraForm;
