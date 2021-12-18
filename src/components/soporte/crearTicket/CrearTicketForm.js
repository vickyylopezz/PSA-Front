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
import { useHistory, useLocation } from "react-router-dom";

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
  let history = useHistory();
  const [descripcion, setDescripcion] = useState('');
  const [titulo, setTitulo] = useState('');
  const [clients, setClients] = useState([]);
  const [severidades, setSeveridades] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [personaAsignada, setPersonaAsignada] = useState('');
  const [fechaFinalizacion, setFechaFinalizacion] = useState('2014-08-18');
  const [estado, setEstado] = useState('');
  const [severidad, setSeveridad] = useState(0);
  const [tareas, setTareas] = useState([]);
  const [tareasAsignadas, setTareasAsignadas] = useState([]);
  const [proyectos, setProyectos] = useState([]);
  const [esError, setEsError] = useState(false);
  const [cliente, setCliente] = useState('');

  const codigoProducto = location.state.codigoProducto;
  const version = location.state.version;


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

  const handleFechaFinalizacionChange = (newValue) => {
    const date = formatDate(newValue);
    setFechaFinalizacion(date);
  };

  const obtenerClientes = () => {
    fetch("https://aninfo-psa-soporte.herokuapp.com/cliente")
      .then(res => res.json())
      .then((data) => {
        setClients(data);
      })
  }

  const obtenerEmpleados = () => {
    fetch("https://api-recursos.herokuapp.com/empleados/ObtenerEmpleados")
      .then(res => res.json())
      .then((data) => {
        setEmpleados(data);
      })
  }

  const obtenerSeveridades = () => {
    fetch("https://aninfo-psa-soporte.herokuapp.com/severidad")
      .then(res => res.json())
      .then((data) => {
        setSeveridades(data);
      })
  }

  const obtenerProyectos = () => {
    fetch("https://modulo-proyectos-squad7.herokuapp.com/proyectos")
      .then(res => res.json())
      .then((data) => {
        setProyectos(data);
      })
  }

  const onChangeProyecto = value => {
    fetch(`https://modulo-proyectos-squad7.herokuapp.com/proyectos/${value}/tareas`)
      .then(res => res.json())
      .then((data) => {
        setTareas(data);
      })
  }

  useEffect(() => {
    obtenerClientes();
    obtenerSeveridades();
    obtenerProyectos();
    obtenerEmpleados();
  }, [])

  const asociarTareas = (ticketId) => {
    tareasAsignadas.map((tarea) => {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          proyectoId: tarea.codigoProyecto,
          tareaId: tarea.id,
        })
      };
      fetch(`https://aninfo-psa-soporte.herokuapp.com/producto/${codigoProducto}-${version}/ticket/${ticketId}/tarea/asociar`, requestOptions)
        .then(response => response.json())
    })
  }

  const asociarTareaHandler = (value) => {
    setTareasAsignadas(value);
  }

  const crearTicket = () => {
    let ticketId = 0;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clienteId: cliente,
        descripcion: descripcion,
        empleadoId: personaAsignada,
        estado: estado,
        fechaCreacion: new Date().toISOString().slice(0, 10).toString(),
        fechaFinalizacion: fechaFinalizacion.toString(),
        severidadId: severidad,
        tipo: esError ? "error" : "consulta",
        title: titulo
      })
    };
    fetch(`https://aninfo-psa-soporte.herokuapp.com/producto/${codigoProducto}-${version}/ticket`, requestOptions)
      .then(response => response.json())
      .then(data => ticketId = data.id)
      .then(() => {
        if (esError) {
          asociarTareas(ticketId);
        }
        history.push('/consultar-productos');
      })
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
                    onChange={(event) => setTitulo(event.target.value)}
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
                    onChange={(event) => setDescripcion(event.target.value)}
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
                    onChange={(event, value) => setEstado(value.props.value)}
                  >
                    <MenuItem value="Abierto">Abierto</MenuItem>
                    <MenuItem value="EnProgreso">En Progreso</MenuItem>
                    <MenuItem value="ALaEsperaDeDesarrollo"> A la espera de desarrollo</MenuItem>
                    <MenuItem value="ALaEsperaDelCliente"> A la espera del cliente</MenuItem>
                    <MenuItem value="Cerrado"> Cerrado</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={2} />
                <Grid item xs={5} item style={{ marginTop: 32 }}>
                  <InputLabel required variant="standard" htmlFor="severidad">
                    Severidad
                  </InputLabel>
                  <Select
                    required
                    fullWidth
                    name="severidad"
                    labelId="demo-simple-select-label"
                    id="severidad"
                    label="Severidad"
                    formControlProps={{ fullWidth: true }}
                    onChange={(event, value) => setSeveridad(value.props.value)}
                  >
                    {
                      severidades.map((s) => {
                        return (
                          <MenuItem value={s.id}>{s.nombre}</MenuItem>
                        )
                      })
                    }
                  </Select>
                </Grid>
                <LocalizationProvider item dateAdapter={AdapterDateFns}>
                  <Grid item style={{ marginTop: 32 }} xs={6}>
                    <MobileDatePicker
                      label="Fecha finalización"
                      inputFormat="MM/dd/yyyy"
                      value={fechaFinalizacion}
                      onChange={(value) => handleFechaFinalizacionChange(value)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Grid>
                  <Grid item xs={6} />
                </LocalizationProvider>
                <Grid item xs={5} item style={{ marginTop: 16 }}>
                  <InputLabel required variant="standard" htmlFor="cliente">
                    Cliente
                  </InputLabel>
                  <Select
                    required
                    fullWidth
                    name="cliente"
                    labelId="demo-simple-select-label"
                    id="cliente"
                    label="Cliente"
                    formControlProps={{ fullWidth: true }}
                    onChange={(event, value) => setCliente(value.props.value)}
                  >
                    {
                      clients.map((s) => {
                        return (
                          <MenuItem value={s.id}>{s.razonSocial} </MenuItem>
                        )
                      })
                    }
                  </Select>
                </Grid>

                <Grid item xs={2} />
                <Grid item xs={5} item style={{ marginTop: 16 }}>
                  <InputLabel required variant="standard" htmlFor="personaAsignada">
                    Persona asignada
                  </InputLabel>
                  <Select
                    required
                    fullWidth
                    name="personaAsignada"
                    labelId="demo-simple-select-label"
                    id="personaAsignada"
                    label="Persona asignada"
                    formControlProps={{ fullWidth: true }}
                    onChange={(event, value) => setPersonaAsignada(value.props.value)}
                  >
                    {
                      empleados.map((s) => {
                        return (
                          <MenuItem value={s.legajo}>{s.Nombre} {s.Apellido} </MenuItem>
                        )
                      })
                    }
                  </Select>
                </Grid>
                {esError &&
                  <>
                    <Grid item xs={5} item style={{ marginTop: 32 }}>
                      <InputLabel required variant="standard" htmlFor="proyecto">
                        Proyecto
                      </InputLabel>
                      <Select
                        required
                        fullWidth
                        name="proyecto"
                        labelId="demo-simple-select-label"
                        id="proyecto"
                        label="Proyecto"
                        formControlProps={{ fullWidth: true }}
                        onChange={(event, value) => onChangeProyecto(value.props.value)}
                      >
                        {
                          proyectos.map((s) => {
                            return (
                              <MenuItem value={s.id}>{s.nombre}</MenuItem>
                            )
                          })
                        }
                      </Select>
                    </Grid>
                    <Grid item xs={2} />
                    <Grid item xs={5} item style={{ marginTop: 16 }}>
                      <Autocomplete
                        onChange={(event, value) => asociarTareaHandler(value)}
                        multiple
                        id="tags-standard"
                        options={tareas}
                        getOptionLabel={(option) => option.nombre}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="standard"
                            label="Asociar tareas"
                          />
                        )}
                      />
                    </Grid>
                  </>
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
                    type="button"
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
