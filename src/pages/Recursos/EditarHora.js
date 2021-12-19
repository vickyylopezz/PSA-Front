import React from 'react';
import EditarHoraForm from '../../components/recursos/EditarHoraForm';
import Button from '@mui/material/Button';
import { useHistory,useLocation } from "react-router-dom";

const EditarHora = () => {
  let history = useHistory();
  const location = useLocation();

  return (
    <>
      <div style={{ padding: 16, margin: 'auto' }}>
        <EditarHoraForm />
        <div style={{ marginTop: 16 }}>
          <Button variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={() => history.push({
              pathname:'/consultar-horas',
              state: {
                id: location.state.id, 
                proyecto: location.state.proyecto,
                tarea: location.state.tarea,
                fecha: location.state.fecha,
                hora: location.state.horas
              }})}>Volver</Button>
        </div>
      </div>
    </>
  )
};

export default EditarHora;