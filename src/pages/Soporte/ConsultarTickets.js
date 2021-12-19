import React, { useState, useEffect } from 'react';
import QuickFilteringGrid from '../../components/common/DataGrid';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";

const ConsultarTickets = () => {

  const [tickets, setTickets] = useState([]);
  let history = useHistory();

  const columns = [
    { field: 'id', headerName: 'ID Ticket', width: 110, sortable: false },
    { field: 'descripcion', headerName: 'Descripción', sortable: false, flex: 1 },
    { field: 'empleado', headerName: 'Persona asignada', sortable: false, flex: 1 },
    {
      field: 'acciones', headerName: 'Acciones', sortable: false, flex: 1,
      renderCell: (params) => {
        const onVerTicketsHandler = (event) => {
          history.push({
            pathname: '/crear-ticket',
            state: {
              readOnly: true,
              codigoProducto: params.row.codigoProducto,
              version: params.row.version,
              ticketId: params.row.id
            }
          });
        };

        return (
          <>
            <Button
              variant="contained"
              color="primary"
              size="auto"
              onClick={onVerTicketsHandler}
            >
              Ver
            </Button>
          </>
        )
      }
    }
  ]

  useEffect(() => {
    setTickets([]);
    fetch("https://aninfo-psa-soporte.herokuapp.com/producto/tickets")
      .then(res => res.json())
      .then((data) => {
        data.map(d => {
          let empleado = '';
          fetch(`https://api-recursos.herokuapp.com/empleados/ObtenerEmpleados?legajo=${d.empleadoId}`)
            .then(res => res.json())
            .then((res) => {
              empleado = res.Nombre + ' ' + res.Apellido;
              fetch(`http://aninfo-psa-soporte.herokuapp.com/producto/${d.productoId}`)
                .then(prod => prod.json())
                .then((prod) => {
                  setTickets(prev => [...prev, {
                    id: d.id,
                    descripcion: d.descripcion,
                    empleado: empleado,
                    codigoProducto: prod.codigoProducto,
                    version: prod.version
                  }])
                })
            })
        })
      })
  }, [])

  return (
    <>
      <h3><center>ASIGNACIONES A TICKETS </center></h3>
      <QuickFilteringGrid data={tickets} columns={columns} />
    </>
  )
}
export default ConsultarTickets;