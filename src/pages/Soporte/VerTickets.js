import React, { useEffect, useState } from 'react';
import QuickFilteringGrid from '../../components/common/DataGrid';
import Button from '@mui/material/Button';
import { useHistory, useLocation } from "react-router-dom";
import ConfirmModal from '../../components/common/ConfirmModal';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';


const VerTickets = (props) => {
  const [tickets, setTickets] = useState([]);
  let history = useHistory();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [ticketABorrar, setTicketABorrar] = useState(null);

  const columns = [
    { field: 'id', headerName: 'ID', sortable: false, width: 50, flex: 1 },
    // {field:'codigoProducto',headerName:'Codigo producto', width:110},
    { field: 'descripcion', headerName: 'Descripción', sortable: false, width: 150, flex: 1 },
    {
      field: 'acciones', headerName: 'Acciones', sortable: false, width: 300, flex: 1,
      renderCell: (params) => {
        const onVerTicketsHandler = () => {
          history.push({
            pathname: '/crear-ticket',
            state: {
              readOnly: true,
              ticketId: params.row.id,
              codigoProducto: params.row.codigoProducto,
              version: params.row.version
            }
          });
        };

        const onEliminarTicketHandler = (id, codigoProducto, version) => {
          setShowModal(true);
          setTicketABorrar({
            id: id,
            codigoProducto: codigoProducto,
            version: version
          })
        }

        const onEditarTicketHandler = () => {
          history.push({
            pathname: '/crear-ticket',
            state: {
              readOnly: false,
              ticketId: params.row.id,
              codigoProducto: params.row.codigoProducto,
              version: params.row.version
            }
          });
        }

        return (
          <>
            
            <IconButton 
            variant="contained"
            color="error" 
            size="small"
            >
               <DeleteIcon 
               onClick={() => onEliminarTicketHandler(params.row.id, location.state.codigoProducto, location.state.version)} 
               />
             </IconButton>

            <IconButton 
            variant="contained"
            color="warning" 
            size="small"
            style={{ marginLeft: 16 }} 
            aria-label="edit">
               <EditIcon 
               onClick={() => onEditarTicketHandler()}
               />
             </IconButton>

            
            <IconButton 
            variant="contained"
            color="primary" 
            onClick={onVerTicketsHandler} 
            size="small"
            style={{ marginLeft: 16 }}
            aria-label="delete">
               <VisibilityIcon />
             </IconButton>

          </>
        )
      }
    }
  ]

  const onEliminarTicketModalHandler = () => {
    fetch(`https://aninfo-psa-soporte.herokuapp.com/producto/${ticketABorrar.codigoProducto}-${ticketABorrar.version}/ticket/${ticketABorrar.id}`, { method: 'DELETE' })
      .then(() => obtenerTickets());
  }

  const obtenerTickets = () => {
    setTickets([]);
    fetch(url)
      .then(res => res.json())
      .then(
        (data) => {
          data.map(d => {
            fetch(`https://aninfo-psa-soporte.herokuapp.com/producto/${d.productoId}`)
            .then(prod => prod.json())
            .then((prod) => {
              setTickets(prev => [...prev, {
                id: d.id,
                descripcion: d.descripcion,
                codigoProducto: prod.codigoProducto,
                version: prod.version
              }])
            })
          })
        }
      )
  }

  const content = (id, codigoProducto) => {
    return (
      <>
        <p>¿Desea eliminar el Ticket {id} asociado al Producto {codigoProducto}? </p>
        <p><center> <strong> Esta acción no será reversible </strong></center></p>
      </>
    )
  }

  const url = `https://aninfo-psa-soporte.herokuapp.com/producto/${location.state.codigoProducto}-${location.state.version}/ticket`
  useEffect(() => {
    obtenerTickets();
  }, [])
  return (
    <>
      <div style={{ textAlign: 'center' }}><h2>Listado de Tickets - Producto {location.state.codigoProducto} (Versión {location.state.version})</h2> </div>
      <ConfirmModal
        content={content(ticketABorrar?.id, ticketABorrar?.codigoProducto)}
        open={showModal}
        textoConfirmar="Eliminar"
        textoCancelar="Cancelar"
        setOpen={setShowModal}
        onConfirm={onEliminarTicketModalHandler}
      />
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