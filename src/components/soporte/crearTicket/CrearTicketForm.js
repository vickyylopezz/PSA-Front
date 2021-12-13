import react, { useState, useEffect } from 'react';
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
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { useLocation } from "react-router-dom";


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

const CrearIncidenciaForm = (props) => {
  const location = useLocation();
  const [clients, setClients] = useState([]);
  const [personasAsignadas, setPersonasAsignadas] = useState([]);
  const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));
  const [tareas, setTareas] = useState([]);
  const [esError, setEsError] = useState(false);
  const codigoProducto = location.state.codigoProducto;
  const version = location.state.version;
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetch("https://aninfo-psa-soporte.herokuapp.com/cliente")
      .then(res => res.json())
      .then(
        (data) => {
          setClients(data);
        }
      )

    fetch("https://aninfo-psa-soporte.herokuapp.com/persona-asignada")
      .then(res => res.json())
      .then(
        (data) => {
          setPersonasAsignadas(data);
        }
      )

  }, [])

  const crearTicket = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        title: "un titulo",
        clienteId: 1,
        descripcion: "una descripcion",
        estado: "Iniciado",
        fechaCreacion: Date.now().toString(),
        fechaFinalizacion: value.toString(),
        personaAsignadaDni: "11231564",
        severidadId: 1,
        tipo: esError ? "error" : "consulta",
      })
    };
    fetch(`https://aninfo-psa-soporte.herokuapp.com/producto/${codigoProducto}-${version}/ticket`, requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ postId: data.id }));
  }

  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <CssBaseline />
      <Typography variant="h5" align="center" component="h2" gutterBottom>
        Crear Ticket - Producto {codigoProducto} (Versión {version})
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
                      <FormControlLabel value="consulta" control={<Radio />} label="Consulta" onClick={() => setEsError(false)} />
                      <FormControlLabel value="error" control={<Radio />} label="Error" onClick={() => setEsError(true)} />
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
                <Grid item xs={12} style={{ marginTop: 16 }}>
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
                <Grid item xs={5} style={{ marginTop: 32 }}>
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
                <Grid item xs={2} />
                <Grid item xs={5} item style={{ marginTop: 32 }}>
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
                <LocalizationProvider item dateAdapter={AdapterDateFns}>
                  <Grid item style={{ marginTop: 32 }} xs={6}>
                    <MobileDatePicker
                      label="Fecha creación"
                      inputFormat="MM/dd/yyyy"
                      value={value}
                      onChange={handleChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Grid>
                  <Grid item xs={6} />
                </LocalizationProvider>
                <Grid item xs={6} item style={{ marginTop: 16 }}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={clients}
                    getOptionLabel={(option) => option.razonSocial}
                    renderInput={(params) => <TextField {...params} label="Cliente" />}
                  />
                </Grid>
                <Grid item xs={6} item style={{ marginTop: 16 }}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={personasAsignadas}
                    getOptionLabel={(option) => `${option.nombre} ${option.apellido}`}
                    renderInput={(params) => <TextField {...params} label="Persona asignada" />}
                  />
                </Grid>
                {esError &&
                  <Grid item xs={12} item style={{ marginTop: 16 }}>
                    <Autocomplete
                      multiple
                      id="tags-standard"
                      options={clients}
                      getOptionLabel={(option) => option.razonSocial}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          label="Asociar tareas"
                        />
                      )}
                    />
                  </Grid>
                }

                <Grid item style={{ marginTop: 32 }}>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={reset}
                    disabled={submitting || pristine}
                  >
                    Reset
                  </Button>
                </Grid>
                <Grid item style={{ marginTop: 32, marginLeft: 16 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={submitting}
                    onClick={() => crearTicket()}
                  >
                    Crear ticket
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

export default CrearIncidenciaForm;
