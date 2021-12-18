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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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

const diaHoy = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    return today;
}

const VerTarea = (props) => {
  const location = useLocation();
  const [empleados, setEmpleados] = useState([]);
  const [value, setValue] = React.useState(diaHoy);
  const [personaAsignada, setPersonaAsignada] = useState('');
  const [personasAsignadas, setPersonasAsignadas] = useState([]);
  const [open, setOpen] = React.useState(false);


  let history = useHistory();

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseEliminar = () => {
    setOpen(false);
    fetch(`https://modulo-proyectos-squad7.herokuapp.com/proyectos/${location.state.codigoProyecto}/tareas/${location.state.codigoTarea}`, { method: 'DELETE' })
    .then(() => history.push({
        pathname: '/ver-proyecto',
        state: {
           codigoProyecto: location.state.codigoProyecto,
           nombreProyecto: location.state.nombreProyecto,
           liderProyecto: location.state.liderProyecto,
           descripcion: location.state.descripcion,
           estado: location.state.estado,
           fechaCreacion: location.state.fechaCreacion
        }
      }));
  }

  const handleCloseNoEliminar = () => {
    setOpen(false);
  }

  useEffect(() => {
    fetch("https://api-recursos.herokuapp.com/empleados/ObtenerEmpleados") //Cambiar por empleados
      .then(res => res.json())
      .then(
        (data) => {
          setPersonasAsignadas(data);
        }
      )
  }, [])

  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <CssBaseline />
      <Typography variant="h5" align="center" component="h2" gutterBottom>
        Tarea [ {location.state.codigoTarea} ] 
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
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    required
                    name="nombre"
                    type="text"
                    label="Nombre de la Tarea"
                  />
                </Grid>
                <Grid item xs={12} style={{ marginTop: 16 }}>
                  <TextField
                    defaultValue={location.state.descripcionTarea}
                    InputProps={{
                      readOnly: true,
                    }}
                    name="descripcion"
                    fullWidth
                    required
                    multiline
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
                    readOnly="true"
                    fullWidth
                    name="estado"
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
                  {/* <Select
                      required
                      readOnly="true"
                      fullWidth
                      name="estado"
                      labelId="demo-simple-select-label"
                      id="estado"
                      label="Estado"
                      defaultValue={location.state.legajoPersona.toString()}
                    >
                      <MenuItem value={location.state.legajoPersona.toString()}>{location.state.legajoPersona.toString()}</MenuItem>
                    </Select> */}
                    <InputLabel shrink htmlFor="uncontrolled-native" >
                    Persona Asignada
                  </InputLabel>
                  <Select
                    required
                    readOnly="true"
                    fullWidth
                    name="personaAsignada"
                    labelId="demo-simple-select-label"
                    id="personaAsignada"
                    label="Persona Asignada"
                    formControlProps={{ fullWidth: true }}
                    defaultValue={location.state.legajoPersona}
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
                {/* <LocalizationProvider item dateAdapter={AdapterDateFns}>
                    <Grid item style={{ marginTop: 32 }} xs={6}>
                      <MobileDatePicker
                        readOnly="true"
                        label="Fecha creación"
                        inputFormat="MM/dd/yyyy"
                        value={value}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Grid>
                    <Grid item xs={6} />
                </LocalizationProvider> */}
                <Grid container xs={12} spacing={2} justifyContent="flex-end" style={{ padding:10 }} style={{ marginTop: 32}}>
                  <Box paddingRight={2} paddingBottom={2}>
                    <Button
                      type="button"
                      variant="contained"
                      onClick={handleClickOpen}
                      grid
                      color="primary"
                      style={{backgroundColor: "#D32F2F"}}
                    >
                      Eliminar
                    </Button>
                    <Dialog
                      open={open}
                      //onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">
                      {"Seguro que desea eliminar la tarea?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Al eliminar la tarea no podrá recuperarla.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseEliminar}>Si</Button>
                      <Button onClick={handleCloseNoEliminar} autoFocus>
                        No
                      </Button>
                    </DialogActions>
                  </Dialog>
                  </Box>
                  <Box paddingBottom={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      onClick={ () =>
                        history.push({
                          pathname: '/editar-tarea',
                          state: {
                             codigoTarea: location.state.codigoTarea,
                             nombreTarea: location.state.nombreTarea,
                             descripcionTarea: location.state.descripcionTarea,
                             estadoTarea: location.state.estadoTarea,
                             legajoPersona: location.state.legajoPersona,
                             codigoProyecto: location.state.codigoProyecto,
                             nombreProyecto: location.state.nombreProyecto,
                             liderProyecto: location.state.liderProyecto,
                             descripcion: location.state.descripcion,
                             estado: location.state.estado,
                             fechaCreacion: location.state.fechaCreacion
                          }
                        })
                      }
                    >
                      Editar
                    </Button>
                  </Box>
                </Grid>
                {/* <Grid container xs={12} justifyContent="flex-end" style={{ padding:10 }} style={{ marginTop: 32}}>
                </Grid> */}
              </Grid>
            </Paper>
          </form>
        )
        }
      />
      <div style={{ marginTop: 20 }}>
          <Button variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={() => history.push({
              pathname:'/ver-proyecto',
              state: {
                codigoTarea: location.state.codigoTarea,
                nombreTarea: location.state.nombreTarea,
                descripcionTarea: location.state.descripcionTarea,
                estadoTarea: location.state.estadoTarea,
                legajoPersona: location.state.legajoPersona,
                codigoProyecto: location.state.codigoProyecto,
                nombreProyecto: location.state.nombreProyecto,
                liderProyecto: location.state.liderProyecto,
                descripcion: location.state.descripcion,
                estado: location.state.estado,
                fechaCreacion: location.state.fechaCreacion
              }})}>Volver</Button>
        </div>
    </div >
    
    
  );

};

export default VerTarea;