import React from 'react';
// import CrearProyectoForm from ;
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";

const CrearTarea = () => {
  let history = useHistory();

  return (
    <>
      <div style={{ padding: 16, margin: 'auto' }}>
        <CrearTareaForm />
        <div style={{ marginTop: 16 }}>
          <Button variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={() => history.push('/consultar-tareas')}>Volver</Button>
        </div>
      </div>
    </>
  )
};

export default CrearTarea;