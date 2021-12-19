import React from 'react';
import CrearIncidenciaForm from '../../components/soporte/crearTicket/CrearTicketForm';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";

const CrearTicket = () => {
  let history = useHistory();

  return (
    <>
      <div style={{ padding: 16, margin: 'auto' }}>
        <CrearIncidenciaForm />
      </div>
    </>
  )
};

export default CrearTicket;
