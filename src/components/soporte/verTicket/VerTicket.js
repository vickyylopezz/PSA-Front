import React, { useEffect, useState } from 'react';
import QuickFilteringGrid from '../../../components/common/DataGrid';
import Button from '@mui/material/Button';

const VerTicket = (props) => {
  const [tickets, setTickets] = useState([]);
  const columns = [
    { field: 'id', headerName: 'ID', sortable: false, width: 50 },
    // {field:'codigoProducto',headerName:'Codigo producto', width:110},
    { field: 'descripcion', headerName: 'Descripcion', sortable: false, width: 150 },
    {
      field: 'acciones', headerName: 'Acciones', sortable: false, width: 300,
      renderCell: (params) => {
        const onVerTicketsHandler = () => {

        };
        return (
          <>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={onVerTicketsHandler}
            >
              Eliminar
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: 16 }}
              onClick={onVerTicketsHandler}
            >
              Ver
            </Button>
          </>
        )
      }
    }
  ]

  const url = `https://aninfo-psa-soporte.herokuapp.com/producto/${props.codigoProducto}-${props.version}/ticket`
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(
        (data) => {
          setTickets(data);
        }
      )
  }, [])
  return (
    <>
      <QuickFilteringGrid data={tickets} columns={columns} />
      <Button variant="contained"
        color="primary"
        size="small"
        style={{ marginLeft: 16 }}
        onClick={() => window.location.reload(false)}>Volver</Button>
    </>
  )
};

export default VerTicket;