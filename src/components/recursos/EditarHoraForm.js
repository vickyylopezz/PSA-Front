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

const EditarProyectoForm = (props) => {
//   const location = useLocation();
//   const [proyecto, setProyecto] = useState(location.state.proyecto);
//   const [tarea, setTarea] = useState(location.state.tarea);
//   const [fecha, setFecha] = useState(location.state.fecha);
//   const [hora, setHora] = useState(location.state.hora);
//   const [id, setId] = useState('');
//   let history = useHistory();

//   const handleChange = (newValue) => {
//      setValue(newValue);
//   };

//   useEffect(() => {
//     fetch("https://api-recursos.herokuapp.com/empleados/ObtenerEmpleados") 
//       .then(res => res.json())
//       .then(
//         (data) => {
//           setLideres(data);
//         }
//       )
//   }, [])

//   const editarHora = () => {
//     const requestOptions = {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//          codigo: location.state.hora_id,
//          hora: cantidad_horas
//       })
//     };
//     fetch(`https://modulo-proyectos-squad7.herokuapp.com/proyectos/${location.state.codigoProyecto}`, requestOptions)
//       .then(response => response.json())
//       .then(history.push({
//         pathname:'/consultar-horas',
//         state: {
//           hora_id: location.state.hora_id, 
//           proyecto: location.state.nombre,
//           tarea: location.state.tarea,
//           hora: horas,
//           fecha: location.state.fecha
//         }}))
//    }

//   return (
//     <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
//       <CssBaseline />
//       <Typography variant="h5" align="center" component="h2" gutterBottom>
//         Editar Horas
//       </Typography>
//       <Form
//         onSubmit={onSubmit}
//         initialValues={{ employed: true, stooge: 'larry' }}
//         validate={validate}
//         render={({ handleSubmit, reset, submitting, pristine, values }) => (
//           <form onSubmit={handleSubmit} noValidate>
//             <Paper style={{ padding: 16 }}>
//               <Grid container alignItems="flex-start" spacing={2}>
//                 <Grid item xs={12}>
//                   <TextField
//                     defaultValue={location.state.proyecto}
//                     fullWidth
//                     required
//                     name="proyecto"
//                     id="outlined-read-only-input"
//                     label="Proyecto"
//                     type="text"
//                   />
//                 </Grid>
//                 <Grid item xs={12} style={{ marginTop: 16 }}>
//                   <TextField
//                     defaultValue={location.state.descripcion}
//                     name="tarea"
//                     fullWidth
//                     required
//                     multiline
//                     type="text"
//                     id="outlined-read-only-input"
//                     label="Tarea"
//                   />
//                 </Grid>
//                 <LocalizationProvider item dateAdapter={AdapterDateFns}>
//                     <Grid item style={{ marginTop: 32 }} xs={6}>
//                       <MobileDatePicker
//                         label="Fecha"
//                         inputFormat="dd/MM/yyyy"
//                         value={fecha}
//                         onChange={handleChange}
//                         disabled
//                         renderInput={(params) => <TextField {...params} />}
//                       />
//                     </Grid>
                    
//                 </LocalizationProvider>
//                 <Grid item xs={12}>
//                   <TextField
//                     defaultValue={location.state.hora}
//                     fullWidth
//                     required
//                     name="hora"
//                     onChange={(event) => setHoras(event.target.value)}
//                     multiline
//                     label="Proyecto"
//                     type="text"
//                   />
//                 </Grid>
//                     <Grid container xs={12} justifyContent="flex-end" style={{ padding:10 }}>
//                     <Button
//                         variant="contained"
//                         color="primary"
//                         type="button"
//                         onClick={() => editarProyecto()}
//                     >
//                         Cargar
//                     </Button>                    
//                     </Grid>
//               </Grid>
//             </Paper>
//           </form>
//         )
//         }
//       />
//     </div >
//   );

};

export default EditarProyectoForm;
