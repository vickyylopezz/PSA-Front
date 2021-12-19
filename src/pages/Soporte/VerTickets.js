import React, { useEffect, useState } from 'react';
import QuickFilteringGrid from '../../components/common/DataGrid';
import Button from '@mui/material/Button';
import { useHistory, useLocation } from "react-router-dom";
import ConfirmModal from '../../components/common/ConfirmModal';

const VerTickets = (props) => {
  const [tickets, setTickets] = useState([]);
  let history = useHistory();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [ticketABorrar, setTicketABorrar] = useState(null);

  const columns = [
    { field: 'id', headerName: 'ID', sortable: false, width: 50, flex: 1 },
    // {field:'codigoProducto',headerName:'Codigo producto', width:110},
    { field: 'descripcion', headerName: 'Descripcion', sortable: false, width: 150, flex: 1 },
    {
      field: 'acciones', headerName: 'Acciones', sortable: false, width: 300, flex: 1,
      renderCell: (params) => {
        const onVerTicketsHandler = () => {
          history.push({
            pathname: '/crear-ticket',
            state: {
              readOnly: true,
              isNewTicket: false,
              codigoProducto: params.row.versionElegida.codigoProducto,
              version: params.row.versionElegida.version
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
              isNewTicket: false,
              codigoProducto: params.row.versionElegida.codigoProducto,
              version: params.row.versionElegida.version
            }
          });
        }

        return (
          <>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => onEliminarTicketHandler(params.row.id, location.state.codigoProducto, location.state.version)}
            >
              Eliminar
            </Button>
            <Button
              variant="contained"
              color="warning"
              size="small"
              style={{ marginLeft: 16 }}
              onClick={onEditarTicketHandler}
            >
              Editar
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

  const onEliminarTicketModalHandler = () => {
    fetch(`https://aninfo-psa-soporte.herokuapp.com/producto/${ticketABorrar.codigoProducto}-${ticketABorrar.version}/ticket/${ticketABorrar.id}`, { method: 'DELETE' })
      .then(() => obtenerTickets());
  }

  const obtenerTickets = () => {
    fetch(url)
      .then(res => res.json())
      .then(
        (data) => {
          setTickets(data);
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
      <h3>LiSTADO DE TICKETS - Producto {location.state.codigoProducto} (Versión {location.state.version})</h3>
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