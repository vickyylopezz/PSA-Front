import React, { useEffect, useState } from 'react';
import QuickFilteringGrid from '../../components/common/DataGrid';
import Button from '@mui/material/Button';
import { useHistory,useLocation } from "react-router-dom";

const VerTickets = (props) => {
  const [tickets, setTickets] = useState([]);
  let history = useHistory();
  const location = useLocation();

  const columns = [
    { field: 'id', headerName: 'ID', sortable: false, width: 50,flex: 1 },
    // {field:'codigoProducto',headerName:'Codigo producto', width:110},
    { field: 'descripcion', headerName: 'Descripcion', sortable: false, width: 150,flex: 1 },
    {
      field: 'acciones', headerName: 'Acciones', sortable: false, width: 300,flex: 1,
      renderCell: (params) => {
        const onVerTicketsHandler = () => {

        };

        const onEliminarTicketHandler = (id,codigoProducto,version) => {
          fetch(`https://aninfo-psa-soporte.herokuapp.com/producto/${codigoProducto}-${version}/ticket/${id}`, { method: 'DELETE' })
          .then(() => obtenerTickets());
        }
        
        return (
          <>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => onEliminarTicketHandler(params.row.id,location.state.codigoProducto,location.state.version)}
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

  const obtenerTickets = () => {
    fetch(url)
      .then(res => res.json())
      .then(
        (data) => {
          setTickets(data);
        }
      )
  }

  const url = `https://aninfo-psa-soporte.herokuapp.com/producto/${location.state.codigoProducto}-${location.state.version}/ticket`
  useEffect(() => {
    obtenerTickets();
  }, [])
  return (
    <>
      <h3>LiSTADO DE TICKETS - Producto {location.state.codigoProducto} (Versión {location.state.version})</h3>
      <QuickFilteringGrid data={tickets} columns={columns} />
      <Button variant="contained"
        color="primary"
        size="small"
        style={{ marginLeft: 16 }}
        onClick={() => history.push('/consultar-productos')}>Volver</Button>
    </>
  )
};

export default VerTickets;