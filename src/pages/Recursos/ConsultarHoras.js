import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { useHistory, useLocation } from "react-router-dom";
import ConfirmModal from '../../components/common/ConfirmModal';
import QuickFilteringGrid from '../../components/common/DataGrid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';


const ConsultarHoras = () => {
  const [horas, setHoras] = useState([]);
  const [proyectos, setProyectos] = useState([]);

  const [horaElegida, setHoraElegida] = useState();
  const [horaABorrra, setHoraABorrar] = useState(null);
  const [isBusy, setBusy] = useState(true)

  let history = useHistory();
  const location = useLocation();

  useEffect(() => {
    setBusy(true);
    async function fetchData() {
      
      // axios.get("https://api-recursos.herokuapp.com/recursos/ObtenerCargas/2").then((response) => {
      //   setHoras(groupHoras(response));
      //   setBusy(false);
      // });
      
      fetch("https://api-recursos.herokuapp.com/recursos/ObtenerCargas/2")
        .then(res => res.json())
        .then(
          (data) => {
            groupHoras(data);
          }
        )
        setBusy(false);
    }

    fetchData();


  }, [])


  const groupHoras = (data) => {
    setBusy(true);
    let tempHoras = [];
    data.map((d) => {
    
      fetch(`https://modulo-proyectos-squad7.herokuapp.com/proyectos/${d.proyecto_id}`)
        .then(res => res.json())
        .then((res) => {
          setProyectos(res.nombre);
        })
    })
    data.map((d) => {
      tempHoras.push({
        id: d.carga_id,
        proyecto: proyectos,
        tarea: d.tarea_id,
        horas: d.horas,
        fecha: d.fecha,
      });
    })
    
    setHoras(tempHoras);
    setBusy(false);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 150, hide: 'true' },
    { field: 'proyecto', headerName: 'Proyecto', sortable: false, width: 180 },
    { field: 'tarea', headerName: 'Tarea', sortable: false, width: 180},
    { field: 'horas', headerName: 'Horas', sortable: false, width: 150 },
    { field: 'fecha', headerName: 'Fecha', sortable: false, width: 200},
    {
      field: 'acciones', headerName: 'operaciones', sortable: false, width: 100,
      renderCell: (params) => {
          const onEditarHoraHandler = () => {
           history.push({
             pathname: '/editar-tarea',
             state: {
               horaCodigo: location.hora_id,
               proyecto: location.proyecto,
               tarea: location.tarea,
               fecha: location.fecha,
               hora: location.hora
             }
           });
         };

         const onEliminarHoraHandler = (id) => {
            //setShowModal(true);
            setHoraABorrar({
              id: id,
            })
         }

         return (
           <>
              <IconButton color="primary" aria-label="delete">
               <DeleteIcon 
               onClick={() => onEliminarHoraHandler(params.row.id)} 
               />
             </IconButton> 
              <IconButton color="primary"  aria-label="edit">
               <EditIcon 
               onClick={() => onEditarHoraHandler()}
               />
             </IconButton> 
           </>
         )
      }
    }
  ]
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
          
        </div>
        {isBusy ? (
                <h1>Cargando</h1>
              ) : (
                <QuickFilteringGrid data={horas} columns={columns} />
                )}
      </div>

    </>
  )
}
export default ConsultarHoras;
