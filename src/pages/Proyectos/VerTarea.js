import react, { useState, useEffect } from "react";
import { Autocomplete, Box, NativeSelect } from "@mui/material";
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
} from "@material-ui/core";
import React from "react";
import { Form, Field } from "react-final-form";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ConfirmModal from "../../components/common/ConfirmModal";
import Popover from "@mui/material/Popover";

const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  }
  if (!values.lastName) {
    errors.lastName = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  }
  return errors;
};

const onSubmit = async (values) => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  await sleep(600);
  window.alert(JSON.stringify(values, 0, 2));
};

const VerTarea = (props) => {
  const location = useLocation();
  const [empleados, setEmpleados] = useState([]);
  const [personaAsignada, setPersonaAsignada] = useState("");
  const [personasAsignadas, setPersonasAsignadas] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [showModal, setShowModal] = useState(false);
  const [tareaABorrar, setTareaABorrar] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [popoverOpen, setPopoverOpen] = React.useState(false);

  let history = useHistory();

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const openPop = Boolean(anchorEl);

  const onEliminarTareaModalHandler = () => {
    fetch(
      `https://modulo-proyectos-squad7.herokuapp.com/proyectos/${tareaABorrar.codigoProyecto}/tareas/${tareaABorrar.id}`,
      { method: "DELETE" }
    ).then(() =>
      history.push({
        pathname: "/ver-proyecto",
        state: {
          codigoProyecto: location.state.codigoProyecto,
          nombreProyecto: location.state.nombreProyecto,
          liderProyecto: location.state.liderProyecto,
          descripcion: location.state.descripcion,
          estado: location.state.estado,
          fechaCreacion: location.state.fechaCreacion,
        },
      })
    );
  };

  const onEliminarTareaHandler = (id, codigoProyecto) => {
    setShowModal(true);
    setTareaABorrar({
      id: id,
      codigoProyecto: codigoProyecto,
    });
  };

  const content = (id, nombreTarea, codigoProyecto, nombreProyecto) => {
    return (
      <>
        <p>
          ¿Desea eliminar la Tarea {id} con nombre {nombreTarea} perteneciente
          al proyecto [{codigoProyecto}] - {nombreProyecto}?{" "}
        </p>
        <p>
          <center>
            {" "}
            <strong> Esta acción no será reversible </strong>
          </center>
        </p>
      </>
    );
  };

  useEffect(() => {
    fetch("https://api-recursos.herokuapp.com/empleados/ObtenerEmpleados") //Cambiar por empleados
      .then((res) => res.json())
      .then((data) => {
        setPersonasAsignadas(data);
      });
  }, []);

  return (
    <div style={{ padding: 16, margin: "auto", maxWidth: 600 }}>
      <CssBaseline />
      <Typography variant="h5" align="center" component="h2" gutterBottom>
        Tarea [ {location.state.codigoTarea} ]
      </Typography>
      <Form
        onSubmit={onSubmit}
        initialValues={{ employed: true, stooge: "larry" }}
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
                  <InputLabel shrink htmlFor="uncontrolled-native">
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
                    <MenuItem value="CREADA">CREADA</MenuItem>
                    <MenuItem value="ENCURSO">EN CURSO</MenuItem>
                    <MenuItem value="FINALIZADA"> FINALIZADA</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12} item style={{ marginTop: 16 }}>
                  <InputLabel shrink htmlFor="uncontrolled-native">
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
                    onChange={(event, value) =>
                      setPersonaAsignada(value.props.value)
                    }
                  >
                    {personasAsignadas.map((s) => {
                      return (
                        <MenuItem value={s.legajo}>
                          {s.Nombre} {s.Apellido}{" "}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Grid>
                <Grid
                  container
                  xs={12}
                  spacing={2}
                  justifyContent="flex-end"
                  style={{ padding: 10 }}
                  style={{ marginTop: 32 }}
                >
                  <Box paddingRight={2} paddingBottom={2}>
                    <Button
                      type="error"
                      variant="contained"
                      onClick={() =>
                        onEliminarTareaHandler(
                          location.state.codigoTarea,
                          location.state.codigoProyecto
                        )
                      }
                      grid
                      color="primary"
                      id="eliminar"
                      disabled={location.state.estadoTarea == "FINALIZADA" || location.state.estado == "FINALIZADO"}
                      style={{ backgroundColor: "#D32F2F" }}
                      aria-owns={openPop ? "mouse-over-popover" : undefined}
                      aria-haspopup="true"
                      onMouseEnter={handlePopoverOpen}
                      onMouseLeave={handlePopoverClose}
                    >
                      Eliminar
                    </Button>
                  </Box>
                  <Box paddingBottom={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={location.state.estadoTarea == "FINALIZADA" || location.state.estado == "FINALIZADO"}
                      onClick={() =>
                        history.push({
                          pathname: "/editar-tarea",
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
                            fechaCreacion: location.state.fechaCreacion,
                          },
                        })
                      }
                    >
                      Editar
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </form>
        )}
      />
      <ConfirmModal
        content={content(
          location.state.codigoTarea,
          location.state.nombreTarea,
          location.state.codigoProyecto,
          location.state.nombreProyecto
        )}
        open={showModal}
        textoConfirmar="Eliminar"
        textoCancelar="Cancelar"
        setOpen={setShowModal}
        onConfirm={onEliminarTareaModalHandler}
      />
      <div style={{ marginTop: 20 }}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={() =>
            history.push({
              pathname: "/ver-proyecto",
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
                fechaCreacion: location.state.fechaCreacion,
              },
            })
          }
        >
          Volver
        </Button>
      </div>
    </div>
  );
};

export default VerTarea;
