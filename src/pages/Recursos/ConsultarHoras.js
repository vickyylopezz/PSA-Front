import React, { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import QuickFilteringGrid from '../../components/common/DataGrid';
import { set } from 'date-fns';
import DeleteIcon from '@mui/icons-material/Delete';

const ConsultarHoras = () => {
  const [horas, setHoras] = useState([]);
  const [proyecto, setProyecto] = useState([]);

  /*const [productoElegido, setProductoElegido] = useState();*/

  useEffect(() => {
    fetch("https://api-recursos.herokuapp.com/recursos/ObtenerCargas/2")
      .then(res => res.json())
      .then(
        (data) => {
          setHoras(groupHoras(data));
        }
      )
  }, [])
  const groupHoras = (data) => {
    let tempHoras = [];
    data.map((d) => {
      tempHoras.push({
        id: d.carga_id,
        proyecto: proyecto,
        tarea: d.tarea_id,
        horas: d.horas,
        fecha: d.fecha,
      });
    })
    data.map((d) => {
    
      fetch(`https://modulo-proyectos-squad7.herokuapp.com/proyectos/${d.proyecto_id}`)
        .then(res => res.json())
        .then((res) => {
          setProyecto(res.nombre);
        })
    })
    
    return tempHoras;
  };
  const columns = [
    { field: 'id', headerName: 'ID', width: 110, hide: 'true' },
    { field: 'proyecto', headerName: 'Proyecto', sortable: false, flex: 1 },
    { field: 'tarea', headerName: 'Tarea', sortable: false, flex: 1 },
    { field: 'horas', headerName: 'Horas', sortable: false, flex: 1 },
    { field: 'fecha', headerName: 'Fecha', sortable: false, flex: 1 },
    { field: 'acciones', headerName: 'Acciones', sortable: false, flex: 1 },
    {
      renderCell: (params) => {
        const onEditarHoraHandler= (event) => {
          event.preventDefault();
          //setHoraElegida(params.row.versionElegida)
          history.push({
            pathname: '/ver-tickets',
            state: {
              codigoProducto: params.row.versionElegida.codigoProducto,
              version: params.row.versionElegida.version
            }
          });
        };

        const onCrearTicketHandler = (event) => {
          event.preventDefault();
          //setProductoElegido(params.row.versionElegida)
          history.push({
            pathname: '/crear-ticket',
            state: {
              codigoProducto: params.row.versionElegida.codigoProducto,
              version: params.row.versionElegida.version
            }
          });
        }
      return (
          <> 
            <>
             <IconButton color="primary" onClick={onEditarHoraHandler} aria-label="delete">
               <DeleteIcon />
             </IconButton>

           </> 
            <Button
              variant="contained"
              color="primary"
              size="auto"
              onClick={onEditarHoraHandler}
              disabled = {params.row.versionElegida == null}
            >
              Ver tickets
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="auto"
              style={{ marginLeft: 16 }}
              onClick={onCrearTicketHandler}
              disabled={params.row.versionElegida == null}
            >
              Crear un nuevo ticket
            </Button>
          </>
        )
      }
    }
  ]
  let history = useHistory();
  return (
    <>
      <div style={{ textAlign: 'center' }}><h2>Carga Horas</h2></div>
      <div style={{ padding: 16, margin: 'auto' }}>
        <div style={{ float: 'right' }}>
          <Button variant="contained"

            style={{ right: 0 }}
            color="primary"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={() => history.push('/carga-horas')}>Cargar Horas
          </Button>
        </div>
        <div style={{ marginTop: 50 }}>
          <QuickFilteringGrid data={horas} columns={columns} />
        </div>
      </div>

    </>
  )
}
export default ConsultarHoras;
