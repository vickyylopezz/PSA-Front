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
import { useHistory,useLocation } from "react-router-dom";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

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
    let history = useHistory();
    const [proyectos, setProyectos] = useState([]);
    const [value, setValue] = React.useState(diaHoy);
    const [tareas, setTareas] = useState([]);
    const [proyecto_id, setProyecto_id]= useState([]);
    const [tarea_id , setTarea_id]= useState([]);
    const [fecha_ingresada , setFecha]= useState(Date.now());
    const [cantidad_horas , setHoras]= useState(Date.now());
    const handleChange = (newValue) => {
        setValue(newValue);
    };
    const formatDate = date => {
        var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
    
        if (month.length < 2)
          month = '0' + month;
        if (day.length < 2)
          day = '0' + day;
    
        return [year, month, day].join('-');
      }
    const handleFechaChange = (newValue) => {
        setFecha(formatDate(newValue));
      };
    useEffect(() => {
        fetch("https://modulo-proyectos-squad7.herokuapp.com/proyectos")
        .then(res => res.json())
        .then(
          (data) => {
            setProyectos(data);
          }
        )

    }, [])

    const onChangeProyecto = value => { 
        
        fetch(`https://modulo-proyectos-squad7.herokuapp.com/proyectos/${value}/tareas`)
        .then(res => res.json())
        .then(
            (data) => {
                setTareas(data);
            })
        
    }

    const crearCargaHoras = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };
        
        fetch(`https://api-recursos.herokuapp.com/recursos/${proyecto_id}/${tarea_id}/cargarHoras/2?cantidad_horas=${cantidad_horas}&fecha=${fecha_ingresada.toString()}`, requestOptions)
            .then(response => response.json())
            .then(history.push('/consultar-horas'))
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
                                    <InputLabel required variant="standard" htmlFor="proyecto">
                                        Proyecto
                                    </InputLabel>
                                    <Select
                                        required
                                        fullWidth
                                        name="proyecto"
                                        labelId="demo-simple-select-label"
                                        id="proyecto"
                                        label="proyecto"
                                        formControlProps={{ fullWidth: true }}
                                        onChange={(event, value) => onChangeProyecto(value.props.value)}
                                    >
                                        {
                                            proyectos.map((s) => {
                                                return (
                                                <MenuItem value={s.id}>{s.nombre} </MenuItem>
                                                )
                                            })
                                            }
                                    </Select>        
                                </Grid>
                                <Grid item xs={12} item style={{ marginTop: 16 }}>
                                    <Autocomplete
                                        disablePortal
                                        id="tags-standard"
                                        options={tareas}
                                        getOptionLabel={(option) => option.nombre}
                                        
                                        renderInput={(params) => <TextField {...params} label="Tareas *" />}
                                
                                    />
                                </Grid>
                                <LocalizationProvider item dateAdapter={AdapterDateFns}>
                                    <Grid item style={{ marginTop: 32 }} xs={6}>
                                        <MobileDatePicker
                                            label="Fecha"
                                            inputFormat="yyyy-MM-dd"
                                            value={fecha_ingresada}
                                            onChange={(value) => handleFechaChange(value)}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </Grid>
                                    <Grid item xs={6} />
                                </LocalizationProvider>
                                <Grid item style={{ marginTop: 32 }} xs={6}>
                                    <Field
                                        name="Horas"
                                        fullWidth
                                        required
                                        component={TextField}
                                        onChange={(event) => setHoras(event.target.value)}
                                        multiline
                                        type="text"
                                        label="Horas"
                                    />
                                </Grid> 
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
                                <Grid item style={{ marginTop: 32, marginLeft:16 }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="button"
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


