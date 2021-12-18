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

const diaHoy = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    return today;
}

const CrearProyectoForm = (props) => {
  const location = useLocation();
  const [lideres, setLideres] = useState([]);
  const [descripcion, setDescripcion] = useState('');
  const [nombre, setNombre] = useState('');
  const [lider, setLider] = useState('');
  const [estado, setEstado] = useState('');
  const [fechaCreacion, setFechaCreacion] = React.useState(diaHoy);
  const [id, setId] = useState('');
  let history = useHistory();

  useEffect(() => {
    fetch("https://api-recursos.herokuapp.com/empleados/ObtenerEmpleados") 
      .then(res => res.json())
      .then(
        (data) => {
          setLideres(data);
        }
      )
  }, [])

   const crearProyecto = () => {
     const requestOptions = {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
          descripcion: descripcion,
          estado: estado,
          fechaCreacion: fechaCreacion,
          id: id,
          liderDeProyecto: lider,
          nombre: nombre,
       })
     };
     fetch(`https://modulo-proyectos-squad7.herokuapp.com/proyectos`, requestOptions)
       .then(response => response.json())
       .then(history.push('/consultar-proyectos'))
    }

  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <CssBaseline />
      <Typography variant="h5" align="center" component="h2" gutterBottom>
        Crear Proyecto
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
                  <Field
                    fullWidth
                    required
                    name="nombre"
                    component={TextField}
                    type="text"
                    label="Nombre del proyecto"
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
                    label="Descripción del proyecto"
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
                    onChange={(event, value) => setEstado("CREADO")}

                  >
                    <option>CREADO</option>
                  </NativeSelect>
                </Grid>
                <Grid item xs={12} item style={{ marginTop: 16 }}>
                  {/* <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={lideres}
                    getOptionLabel={(option) => option.legajo} //Cambiar por legajo personas
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Lider *" />}
                  /> */}
                  <InputLabel required variant="standard" htmlFor="proyecto">
                        Lider
                  </InputLabel>
                  <Select
                    required
                    fullWidth
                    name="liderProyecto"
                    labelId="demo-simple-select-label"
                    id="liderProyecto"
                    label="Lider"
                    formControlProps={{ fullWidth: true }}
                    onChange={(event, value) => setLider(value.props.value)}
                  >
                    {
                      lideres.map((s) => {
                        return (
                          <MenuItem value={s.legajo}>{s.Nombre} {s.Apellido} </MenuItem>
                        )
                      })
                    }
                  </Select>
                  
                </Grid>
                <LocalizationProvider item dateAdapter={AdapterDateFns}>
                    <Grid item style={{ marginTop: 32 }} xs={6}>
                      <MobileDatePicker
                        label="Fecha de Creación"
                        inputFormat="dd/MM/yyyy"
                        value={fechaCreacion}
                        disabled
                        onChange={(value) => setFechaCreacion(fechaCreacion)}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Grid>
                    <Grid item xs={6} />
                </LocalizationProvider>
                {/* <Grid item style={{ marginTop: 32 }}>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={reset}
                    disabled={submitting || pristine}
                  >
                    Reset
                  </Button>
                </Grid> */}
                <Grid container xs={12} justifyContent="flex-end" style={{ padding:10 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={submitting}
                    onClick={() => crearProyecto()}

                  >
                    Crear Proyecto
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

export default CrearProyectoForm;
