import React, { useEffect, useState } from "react";
import QuickFilteringGrid from "../../components/common/DataGrid";
import Button from "@mui/material/Button";
import { useHistory, useLocation } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import EventIcon from "@mui/icons-material/Event";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ConfirmModal from "../../components/common/ConfirmModal";

const VerProyecto = (props) => {
  const [tareas, setTareas] = useState([]);
  const [tareaElegida, setTareaElegida] = useState();
  const [lider, setLider] = useState([]);
  const [personasAsignadas, setPersonasAsignadas] = useState([]);
  let history = useHistory();
  const location = useLocation();
  let nombre;
  let apellido;
  const [showModal, setShowModal] = useState(false);
  const [proyectoABorrar, setProyectoABorrar] = useState(null);

  useEffect(() => {
    fetch(
      `https://api-recursos.herokuapp.com/empleados/ObtenerEmpleados?legajo=${location.state.liderProyecto}`
    )
      .then((res) => res.json())
      .then((data) => {
        setLider(data);
      });
  }, []);

  useEffect(() => {
    fetch(`https://api-recursos.herokuapp.com/empleados/ObtenerEmpleados`)
      .then((res) => res.json())
      .then((data) => {
        setPersonasAsignadas(data);
      });
  }, []);

  const columns = [
    { field: "id", headerName: "Codigo", width: 110 },
    { field: "nombre", headerName: "Nombre", sortable: false, width: 150 },
    {
      field: "descripcion",
      headerName: "Descripción",
      sortable: false,
      width: 200,
    },
    { field: "estado", headerName: "Estado", sortable: false, width: 150 },
    {
      field: "legajoPersonaAsignada",
      headerName: "Legajo",
      sortable: false,
      width: 150,
      renderCell: (params) => {
        return personasAsignadas.map((s) => {
          if (s.legajo == params.row.legajoPersonaAsignada) {
            nombre = s.Nombre;
            apellido = s.Apellido;
            return (
              <Typography fontSize={"0.875rem"}>
                {s.Nombre} {s.Apellido}{" "}
              </Typography>
            );
          }
        });
      },
    },

    {
      field: "ticket",
      headerName: "Ticket",
      sortable: false,
      width: 170,
      renderCell: (params) => {
        return (
          <>
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: 16 }}
            >
              Ver Ticket
            </Button>
          </>
        );
      },
    },

    {
      field: "acciones",
      headerName: "",
      sortable: false,
      width: 60,

      renderCell: (params) => {
        const onVerTareaHandler = (event) => {
          event.preventDefault();
          history.push({
            pathname: "/ver-tarea",
            state: {
              codigoTarea: params.row.id,
              nombreTarea: params.row.nombre,
              descripcionTarea: params.row.descripcion,
              estadoTarea: params.row.estado,
              legajoPersona: params.row.legajoPersonaAsignada,
              codigoProyecto: location.state.codigoProyecto,
              nombreProyecto: location.state.nombreProyecto,
              liderProyecto: location.state.liderProyecto,
              descripcion: location.state.descripcion,
              estado: location.state.estado,
              fechaCreacion: location.state.fechaCreacion,
            },
          });
        };

        return (
          <>
            <IconButton
              color="primary"
              onClick={onVerTareaHandler}
              aria-label="ver-mas"
            >
              <VisibilityIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  const obtenerTareas = () => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTareas(data);
      });
  };

  const onEliminarProyectoModalHandler = () => {
    fetch(
      `https://modulo-proyectos-squad7.herokuapp.com/proyectos/${proyectoABorrar.id}`,
      { method: "DELETE" }
    ).then(() => history.push("/consultar-proyectos"));
  };

  const onEliminarProyectoHandler = (id) => {
    setShowModal(true);
    setProyectoABorrar({
      id: id,
    });
  };

  const content = (id, nombreProyecto) => {
    return (
      <>
        <p>
          ¿Desea eliminar el Proyecto {id} con nombre {nombreProyecto}?{" "}
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

  const url = `https://modulo-proyectos-squad7.herokuapp.com/proyectos/${location.state.codigoProyecto}/tareas`;
  useEffect(() => {
    obtenerTareas();
  }, []);
  return (
    <>
      <div style={{ paddingBottom: 10 }}>
        <div
          style={{
            backgroundColor: "#9fd9f8",
            paddingLeft: 10,
            borderRadius: "6px",
          }}
        >
          <Grid container spacing={2} paddingBottom={3}>
            <Box
              sx={{
                mx: "auto",
                width: "auto",
                paddingLeft: 0,
                paddingTop: 4.5,
                borderRadius: 1,
                fontSize: 30,
                fontFamily: "Sans-Serif",
              }}
            >
              [{location.state.codigoProyecto}] -{" "}
              {location.state.nombreProyecto}
            </Box>
            <Grid item xs={8}>
              <Box component="div" sx={{ p: 2 }}>
                <Stack direction="row" spacing={1}>
                  <Stack
                    direction="row"
                    spacing={2}
                    paddingRight={1}
                    paddingTop={0.5}
                  >
                    <Box
                      sx={{
                        mx: "auto",
                        bgcolor: "primary.main",
                        color: "#fff",
                        width: 150,
                        p: 1,
                        borderRadius: 1,
                        display: "grid",
                        gridAutoColumns: "1fr",
                        gap: 1,
                        textAlign: "left"
                      }}
                    >
                      
                      <Box sx={{ gridRow: "1"}} >
                        Lider:
                      </Box>
                      <Box sx={{ gridRow: "2" }}>
                        {lider.Nombre} {lider.Apellido}
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        mx: "auto",
                        bgcolor: "primary.main",
                        color: "#fff",
                        width: "auto",
                        p: 1,
                        borderRadius: 1,
                        display: "grid",
                        gridAutoColumns: "1fr",
                        gap: 1,
                      }}
                    >
                      <Box sx={{ gridRow: "1" }}>
                        Estado:
                      </Box>
                      <Box sx={{ gridRow: "2", paddingTop: 0.5 }}>
                        {location.state.estado}
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        mx: "auto",
                        bgcolor: "primary.main",
                        color: "#fff",
                        width: "auto",
                        p: 1,
                        borderRadius: 1,
                        display: "grid",
                        gridAutoColumns: "1fr",
                        gap: 0.5,
                      }}
                    >
                      <Box sx={{ gridRow: "1" }}>
                        Fecha de Creación:
                      </Box>
                      <Box sx={{ gridRow: "2", paddingTop: 0.5 }}>
                        {location.state.fechaCreacion}
                      </Box>
                    </Box>
                  </Stack>
                  <div>
                    <IconButton
                      color="warning"
                      aria-label="edit"
                      disabled={location.state.estado == "FINALIZADO"}
                    >
                      <EditIcon
                        onClick={() =>
                          history.push({
                            pathname: "/editar-proyecto",
                            state: {
                              codigoProyecto: location.state.codigoProyecto,
                              nombreProyecto: location.state.nombreProyecto,
                              liderProyecto: location.state.liderProyecto,
                              descripcion: location.state.descripcion,
                              estado: location.state.estado,
                              fechaCreacion: location.state.fechaCreacion,
                            },
                          })
                        }
                      />
                    </IconButton>
                  </div>
                  <div>
                    <IconButton
                      color="error"
                      aria-label="delete"
                      disabled={location.state.estado == "FINALIZADO"}
                    >
                      <DeleteIcon
                        onClick={() =>
                          onEliminarProyectoHandler(
                            location.state.codigoProyecto
                          )
                        }
                      />
                    </IconButton>
                  </div>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography>{location.state.descripcion}</Typography>
            </Grid>
          </Grid>
        </div>
      </div>
      <div style={{ paddingBottom: 2 }}>
        <div style={{ float: "right" }}>
          <Button
            variant="contained"
            style={{ right: 0 }}
            color="primary"
            size="small"
            style={{ marginLeft: 16 }}
            disabled={location.state.estado == "FINALIZADO"}
            onClick={() =>
              history.push({
                pathname: "/crear-tarea",
                state: {
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
            Crear Tarea
          </Button>
        </div>
        <div style={{ paddingTop: 15 }}>
          <Typography style={{ paddingLeft: 5 }}>Tareas:</Typography>
        </div>
      </div>
      <ConfirmModal
        content={content(
          location.state.codigoProyecto,
          location.state.nombreProyecto
        )}
        open={showModal}
        textoConfirmar="Eliminar"
        textoCancelar="Cancelar"
        setOpen={setShowModal}
        onConfirm={onEliminarProyectoModalHandler}
      />
      <QuickFilteringGrid data={tareas} columns={columns} />
      <Button
        variant="contained"
        color="primary"
        size="small"
        style={{ marginLeft: 16 }}
        onClick={() => history.push("/consultar-proyectos")}
      >
        Volver
      </Button>
    </>
  );
};

export default VerProyecto;
