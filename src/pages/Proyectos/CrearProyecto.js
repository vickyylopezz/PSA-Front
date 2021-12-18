import React from 'react';
import CrearProyectoForm from '../../components/proyectos/crear/CrearProyectoForm';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";

const CrearProyecto = () => {
  let history = useHistory();

  return (
    <>
      <div style={{ padding: 16, margin: 'auto' }}>
        <CrearProyectoForm />
        <div style={{ marginTop: 16 }}>
          <Button variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={() => history.push('/consultar-proyectos')}>Volver</Button>
        </div>
      </div>
    </>
  )
};

export default CrearProyecto;
