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
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const ConsultarHoras = () => {
  const [horas, setHoras] = useState([]);
  const [proyectos, setProyectos] = useState([]);

  const [horaElegida, setHoraElegida] = useState();

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
        proyecto: proyectos,
        tarea: d.tarea_id,
        horas: d.horas,
        fecha: d.fecha,
      });
    })
    data.map((d) => {
    
      fetch(`https://modulo-proyectos-squad7.herokuapp.com/proyectos/${d.proyecto_id}`)
        .then(res => res.json())
        .then((res) => {
          setProyectos(res.nombre);
        })
    })
    
    return tempHoras;
  };
  const columns = [
    { field: 'id', headerName: 'ID', width: 110, hide: 'true' },
    { field: 'proyecto', headerName: 'Proyecto', sortable: false, width: 150 },
    { field: 'tarea', headerName: 'Tarea', sortable: false, width: 150},
    { field: 'horas', headerName: 'Horas', sortable: false, width: 120 },
    { field: 'fecha', headerName: 'Fecha', sortable: false, width: 150},
    {
      field: 'acciones', headerName: 'operaciones', sortable: false, width: 180,
      renderCell: (params) => {
          const onVerProyectoHandler = (event) => {
           event.preventDefault();
           setHoraElegida(params.row.horaElegida)
           history.push({
             pathname: '/ver-proyecto',
             state: {
               horaCodigo: params.row.horaElegida.Hora_id,
              //  version: params.row.proyectoElegido.codigo
             }
           });
         };

         return (
           <>
             <IconButton color="primary" onClick={onVerProyectoHandler} aria-label="delete">
               <DeleteIcon />
             </IconButton>
             <IconButton color="primary" onClick={onVerProyectoHandler} aria-label="delete">
               <EditIcon />
             </IconButton>
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
