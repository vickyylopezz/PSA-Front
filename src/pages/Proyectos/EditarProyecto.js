import React from 'react';
import EditarProyectoForm from '../../components/proyectos/editar/EditarProyectoForm';
import Button from '@mui/material/Button';
import { useHistory,useLocation } from "react-router-dom";

const EditarProyecto = () => {
  let history = useHistory();
  const location = useLocation();

  return (
    <>
      <div style={{ padding: 16, margin: 'auto' }}>
        <EditarProyectoForm />
        <div style={{ marginTop: 16 }}>
          <Button variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={() => history.push({
              pathname:'/ver-proyecto',
              state: {
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

export default EditarProyecto;