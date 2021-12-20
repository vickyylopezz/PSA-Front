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
import { useLocation } from "react-router-dom";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const validate = values => {
  const errors = {};
  if (!values.nombre) {
    errors.firstName = 'Required';
  }
  if (!values.descripcion) {
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

const EditarTareaForm = (props) => {
  const location = useLocation();
  const [legajoPersona, setLegajoPersona] = useState(location.state.legajoPersona);
  const [personasAsignadas, setPersonasAsignadas] = useState([]);
  const [descripcion, setDescripcion] = useState(location.state.descripcionTarea);
  const [estado, setEstado] = useState(location.state.estadoTarea);
  const [nombre, setNombre] = useState(location.state.nombreTarea);

  let history = useHistory();

  useEffect(() => {
    fetch("https://api-recursos.herokuapp.com/empleados/ObtenerEmpleados")
      .then(res => res.json())
      .then(
        (data) => {
          setPersonasAsignadas(data);
        }
      )
  }, [])

  const editarTarea = () => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        codigoTarea: location.state.codigoTarea, 
        codigoProyecto: location.state.codigoProyecto,
        descripcion: descripcion,
        estado: estado,
        id: location.state.codigoTarea,
        legajoPersonaAsignada: legajoPersona,
        nombre: nombre,
      })
    };
    fetch(`https://modulo-proyectos-squad7.herokuapp.com/proyectos/${location.state.codigoProyecto}/tareas/${location.state.codigoTarea}`, requestOptions)
      .then(response => response.json())
      .then(history.push({
        pathname:'/ver-proyecto',
        state: {
            codigoTarea: location.state.codigoTarea,
            nombreTarea: nombre,
            descripcionTarea: descripcion,
            estadoTarea: estado,
            legajoPersona: legajoPersona,
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
        Editar Tarea [ {location.state.codigoTarea} ] 
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
                    defaultValue={location.state.nombreTarea}
                    fullWidth
                    required
                    onChange={(event) => setNombre(event.target.value)}
                    name="nombre"
                    type="text"
                    label="Nombre de la Tarea"
                  />
                </Grid>
                <Grid item xs={12} style={{ marginTop: 16 }}>
                  <TextField
                    defaultValue={location.state.descripcionTarea}
                    name="descripcion"
                    fullWidth
                    required
                    multiline
                    onChange={(event) => setDescripcion(event.target.value)}
                    type="text"
                    label="Descripción de la Tarea"
                  />
                </Grid>
                <Grid item xs={12} item style={{ marginTop: 16 }}>
                  <InputLabel shrink htmlFor="uncontrolled-native" >
                    Estado
                  </InputLabel> 
                  <Select
                    required
                    fullWidth
                    name="estado"
                    onChange={(event) => setEstado(event.target.value)}

                    labelId="demo-simple-select-label"
                    id="estado"
                    label="Estado"
                    defaultValue={location.state.estadoTarea}
                  >
                    <MenuItem value="CREADA">CREADO</MenuItem>
                    <MenuItem value="ENCURSO">EN CURSO</MenuItem>
                    <MenuItem value="FINALIZADA"> FINALIZADO</MenuItem>
                    
                  </Select>
                </Grid>
                <Grid item xs={12} item style={{ marginTop: 16 }}>
                <InputLabel shrink htmlFor="uncontrolled-native" >
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
                    defaultValue={location.state.legajoPersona}
                    onChange={(event, value) => setLegajoPersona(value.props.value)}
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
                      disabled={!nombre || !descripcion || !legajoPersona }
                      onClick={ () => editarTarea()
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

export default EditarTareaForm;