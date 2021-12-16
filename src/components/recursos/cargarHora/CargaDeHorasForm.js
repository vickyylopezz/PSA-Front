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
import { useLocation } from "react-router-dom";
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

const CargaDeHorasForm = (props) => {
    const location = useLocation();
    const [proyectos, setProyectos] = useState([]);
    const [value, setValue] = React.useState(diaHoy);
    const [tareas, setTareas] = useState([]);
    const handleChange = (newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        fetch("https://modulo-proyectos-squad7.herokuapp.com/proyectos/getProyectos") 
          .then(res => res.json())
          .then(
            (data) => {
              setProyectos(data);
            }
          )
      }, [])
    const crearCargaHoras = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                proyecto_id: 1,
                tarea_id: 2,
                legajo: 104222,
                cantidad_horas: 4,
                fecha: Date.now().toString(),
            })
        };
        fetch('https://api-recursos.herokuapp.com/docs#/Recursos/cargar_Horas_Usuarios', requestOptions)
        .then(response => response.json())
        .then(data => this.setState({ postId: data.id }));
    }    

      return (
        <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
            <CssBaseline />
            <Typography variant="h5" align="center" component="h2" gutterBottom>
            Cargar Tarea
            </Typography>
            <Form
                onSubmit={onSubmit}
                initialValues={{ employed: true, stooge: 'larry' }}
                validate={validate}
                render={({ handleSubmit, reset, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit} noValidate>
                        <Paper style={{ padding: 16 }}>
                            <Grid container alignItems="flex-start" spacing={2}>
                                <Grid item xs={12} item style={{ marginTop: 16 }}>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={proyectos}
                                        getOptionLabel={(option) => option.nombre} //Cambiar por legajo personas
                                        sx={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} label="Proyecto *" />}
                                    />
                                </Grid>
                                <Grid item xs={12} item style={{ marginTop: 16 }}>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={tareas}
                                        getOptionLabel={(option) => option.nombre} //Cambiar por legajo personas
                                        sx={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} label="Tareas *" />}
                                    />
                                </Grid>
                                <LocalizationProvider item dateAdapter={AdapterDateFns}>
                                    <Grid item style={{ marginTop: 32 }} xs={6}>
                                        <MobileDatePicker
                                            label="Fecha"
                                            inputFormat="dd/MM/yyyy"
                                            value={value}
                                            onChange={handleChange}
                                            disabled
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </Grid>
                                    <Grid item xs={6} />
                                </LocalizationProvider>
                                <Grid item style={{ marginTop: 32 }} xs={6}>
                                    <TextField
                                        id="outlined-number"
                                        label="Number"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>   
                                <Grid item style={{ marginTop: 32, marginLeft:16 }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        disabled={submitting}
                                        onClick={() => crearCargaHoras()}
                                    >
                                        Cargar
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

export default CargaDeHorasForm;