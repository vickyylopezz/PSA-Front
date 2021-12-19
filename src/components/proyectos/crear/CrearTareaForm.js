import react, { useState, useEffect } from 'react';
import { Autocomplete, Box, NativeSelect } from '@mui/material';
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

const onSubmit = async values => {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const diaHoy = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    return today;
}

const CrearTareaForm = (props) => {
  const location = useLocation();
  const [personasAsignadas, setPersonasAsignadas] = useState([]);
  const [personaAsignada, setPersonaAsignada] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState('');
  const [nombre, setNombre] = useState('');

  const [value, setValue] = React.useState(diaHoy);
  let history = useHistory();

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetch("https://api-recursos.herokuapp.com/empleados/ObtenerEmpleados") 
      .then(res => res.json())
      .then(
        (data) => {
          setPersonasAsignadas(data);
        }
      )
  }, [])

  const crearTarea = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          codigoProyecto: location.state.codigoProyecto,
          descripcion: descripcion,
          estado: estado,
          id: '',
          legajoPersonaAsignada: personaAsignada,
          nombre: nombre,
      })
    };
    fetch(`https://modulo-proyectos-squad7.herokuapp.com/proyectos/${location.state.codigoProyecto}/tareas`, requestOptions)
      .then(response => response.json())
      .then(history.push({
        pathname:'/ver-proyecto',
        state: {
            codigoProyecto: location.state.codigoProyecto,
            nombreProyecto: location.state.nombreProyecto,
            liderProyecto: location.state.liderProyecto,
            descripcion: location.state.descripcion,
            estado: location.state.estado,
            fechaCreacion: location.state.fechaCreacion
        }}))
   }

  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <CssBaseline />
      <Typography variant="h5" align="center" component="h2" gutterBottom>
        Crear Tarea ( [{location.state.codigoProyecto}] - {location.state.nombreProyecto} )
      </Typography>
      <Form
        onSubmit={onSubmit}
        initialValues={{ employed: true, stooge: 'larry' }}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    required
                    name="nombre"
                    component={TextField}
                    type="text"
                    label="Nombre de la Tarea"
                    onChange={(event) => setNombre(event.target.value)}

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
                    label="Descripción de la Tarea"
                    onChange={(event) => setDescripcion(event.target.value)}

                  />
                </Grid>
                <Grid item xs={12} item style={{ marginTop: 16 }}>
                  <InputLabel shrink htmlFor="uncontrolled-native" >
                    Estado
                  </InputLabel> 

                  <NativeSelect
                    disablePortal
                    disabled
                    id="controllable-states-demo"
                    sx={{ width: 300 }}
                  >
                    <option>Creada</option>
                  </NativeSelect>
                </Grid>
                <Grid item xs={12} item style={{ marginTop: 16 }}>
                <InputLabel required variant="standard" htmlFor="tarea" >
                    Persona Asignada
                  </InputLabel>
                  <Select
                    required
                    fullWidth
                    name="personaAsignada"
                    labelId="demo-simple-select-label"
                    id="personaAsignada"
                    label="Persona Asignada"
                    formControlProps={{ fullWidth: true }}
                    onChange={(event, value) => setPersonaAsignada(value.props.value)}
                  >
                    {
                      personasAsignadas.map((s) => {
                        return (
                          <MenuItem value={s.legajo}>{s.Nombre} {s.Apellido} </MenuItem>
                        )
                      })
                    }
                  </Select>
                </Grid>
                <Grid container xs={12} spacing={2} justifyContent="flex-end" style={{ padding:10 }} style={{ marginTop: 32}}>
                  <Box paddingBottom={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={!nombre || !descripcion || !personaAsignada}
                      onClick={ () => crearTarea()
                      }
                    >
                      Submit
                    </Button>
                  </Box>
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

export default CrearTareaForm;
