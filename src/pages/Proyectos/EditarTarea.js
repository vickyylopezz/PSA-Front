import React from 'react';
import EditarTareaForm from '../../components/proyectos/editar/EditarTareaForm';
import Button from '@mui/material/Button';
import { useHistory,useLocation } from "react-router-dom";

const EditarTarea = () => {
  let history = useHistory();
  const location = useLocation();

  return (
    <>
      <div style={{ padding: 16, margin: 'auto' }}>
        <EditarTareaForm />
        <div style={{ marginTop: 16 }}>
          <Button variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={() => history.push({
              pathname:'/ver-tarea',
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
      </div>
    </>
  )
};

export default EditarTarea;