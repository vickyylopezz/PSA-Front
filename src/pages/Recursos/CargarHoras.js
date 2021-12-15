import React from 'react';
import CargaDeHorasForm from '../../components/recursos/cargarHora/CargaDeHorasForm';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";

const CargarHoras = () => {
  let history = useHistory();

  return (
    <>
      <div style={{ padding: 16, margin: 'auto' }}>
        <CargaDeHorasForm />
        <div style={{ marginTop: 16 }}>
          <Button variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={() => history.push('/consultar-horas')}>Volver</Button>
        </div>
      </div>
    </>
  )
};

export default CargarHoras;