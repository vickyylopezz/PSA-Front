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
  if (values.nombre == "") {
    errors.nombre = 'Required';
  }
  if (values.descripcion == "") {
    errors.descripcion = 'Required';
  }
  if (values.liderProyecto == "") {
    errors.liderProyecto = 'Required';
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


const EditarProyectoForm = (props) => {
  const location = useLocation();
  const [lideres, setLideres] = useState([]);
  const [value, setValue] = React.useState(diaHoy);
  const [lider, setLider] = useState(location.state.liderProyecto);
  const [descripcion, setDescripcion] = useState(location.state.descripcion);
  const [nombre, setNombre] = useState(location.state.nombreProyecto);
  const [estado, setEstado] = useState(location.state.estado);
  const [id, setId] = useState('');
  let history = useHistory();
  let submiteable = true;
  const handleChange = (newValue) => {
     setValue(newValue);
  };

  useEffect(() => {
    fetch("https://api-recursos.herokuapp.com/empleados/ObtenerEmpleados") 
      .then(res => res.json())
      .then(
        (data) => {
          setLideres(data);
        }
      )
  }, [])

  const editarProyecto = () => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
         codigo: location.state.codigoProyecto,
         descripcion: descripcion,
         estado: estado,
         fechaCreacion: location.state.fechaCreacion,
         id: location.state.codigoProyecto,
         liderDeProyecto: lider,
         nombre: nombre,
      })
    };
    fetch(`https://modulo-proyectos-squad7.herokuapp.com/proyectos/${location.state.codigoProyecto}`, requestOptions)
      .then(response => response.json())
      .then(history.push({
        pathname:'/ver-proyecto',
        state: {
          codigoProyecto: location.state.codigoProyecto, 
          nombreProyecto: nombre,
          liderProyecto: lider,
          descripcion: descripcion,
          estado: estado,
          fechaCreacion: location.state.fechaCreacion
        }}))
   }

  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <CssBaseline />
      <Typography variant="h5" align="center" component="h2" gutterBottom>
        Editar proyecto [ {location.state.codigoProyecto} ] 
      </Typography>
      <Form
        onSubmit={onSubmit}
        initialValues={{ nombre, descripcion }}
        validate={validate}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} >
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    defaultValue={location.state.nombreProyecto}
                    fullWidth
                    required
                    name="nombre"
                    type="text"
                    label="Nombre del proyecto"
                    onChange={(event) => setNombre(event.target.value)}
                  />
                </Grid>                
                <Grid item xs={12} style={{ marginTop: 16 }}>
                  <TextField
                    defaultValue={location.state.descripcion}
                    name="descripcion"
                    fullWidth
                    required
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
                  <Select
                    required
                    fullWidth
                    name="estado"
                    labelId="demo-simple-select-label"
                    id="estado"
                    label="Estado"
                    defaultValue={location.state.estado}
                    onChange={(event, value) => setEstado(value.props.value)}

                  >
                    <MenuItem value="CREADO">CREADO</MenuItem>
                    <MenuItem value="ENCURSO">EN CURSO</MenuItem>
                    <MenuItem value="FINALIZADO"> FINALIZADO</MenuItem>
                    
                  </Select>
                </Grid>
                <Grid item xs={12} item style={{ marginTop: 16 }}>
                <InputLabel shrink htmlFor="uncontrolled-native" >
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
                    defaultValue={location.state.liderProyecto}
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
                        value={value}
                        onChange={handleChange}
                        disabled
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Grid>
                </LocalizationProvider>
                    <Grid container xs={12} justifyContent="flex-end" style={{ padding:10 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={submitting}
                        onClick={() => editarProyecto()}
                    >
                        Submit
                    </Button>
                    

                    </Grid>
              </Grid>
            </Paper>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )
        }
      />
    </div >
  );

};

export default EditarProyectoForm;
