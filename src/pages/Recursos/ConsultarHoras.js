import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { useHistory, useLocation } from "react-router-dom";
import ConfirmModal from '../../components/common/ConfirmModal';
import QuickFilteringGrid from '../../components/common/DataGrid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ConsultarHoras = () => {
  const [horas, setHoras] = useState([]);
  const [proyectos, setProyectos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [horaElegida, setHoraElegida] = useState();
  const [horaABorrar, setHoraABorrar] = useState(null);
  const [horas_persona, setHorasPersona] = useState(null);
  const [nombre_persona, setNombrePersona] = useState(null);

  let history = useHistory();
  const location = useLocation();
  
  const obtenerHoras = () => {
    setHoras([]);
      fetch(url)
      .then(res => res.json())
        .then((data) => {
          data.map(d => {
            fetch(`https://modulo-proyectos-squad7.herokuapp.com/proyectos/${d.proyecto_id}`)
              .then(res => res.json())
              .then((res) => {
                fetch(`https://modulo-proyectos-squad7.herokuapp.com/proyectos/${d.proyecto_id}/tareas/${d.tarea_id}`)
                .then((aux)=> aux.json())
                .then((aux) =>{
                  setHoras(prev => [...prev, {
                    id:d.carga_id,
                    proyecto: res.nombre,
                    tarea: aux.nombre,
                    horas: d.horas,
                    fecha: d.fecha            
                  }])
                })
                
              })
          })
        })
        fetch(`https://api-recursos.herokuapp.com/recursos/ObtenerHorasEmpleado/2`)
          .then(res => res.json())
          .then((data) =>{
            setHorasPersona(data)
        })
        fetch(`https://api-recursos.herokuapp.com/empleados/ObtenerEmpleados?legajo=2`)
          .then(res => res.json())
          .then((data) =>{
            setNombrePersona(data.Nombre + " " + data.Apellido)
        })
        
              
  }
  
  const url = "https://api-recursos.herokuapp.com/recursos/ObtenerCargas/2"
  useEffect(() => {
      obtenerHoras();
  }, [])


  const columns = [
    { field: 'id', headerName: 'ID', width: 150, hide: 'true' },
    { field: 'proyecto', headerName: 'Proyecto', sortable: false, width: 180 },
    { field: 'tarea', headerName: 'Tarea', sortable: false, width: 180},
    { field: 'horas', headerName: 'Horas', sortable: false, width: 150 },
    { field: 'fecha', headerName: 'Fecha', sortable: false, width: 200},
    {field: 'acciones', headerName: 'Acciones', sortable: false, width: 150,
      renderCell: (params) => {
          const onEditarHoraHandler = (event) => {
            setHoraElegida(params.row.horaElegida) 
            history.push({
              pathname: '/editar-hora',
              state: {
                id: params.row.id,
                proyecto: params.row.proyecto,
                tarea: params.row.tarea,
                fecha: params.row.fecha,
                horas: params.row.horas
              }
            });
         };

         const onEliminarHoraHandler = (id, proyecto, tarea) => {
            setShowModal(true);
            setHoraABorrar({
              id: id,
              proyecto: proyecto,
              tarea: tarea
            })
         }

         return (
           <>
              <IconButton color="error" aria-label="delete">
               <DeleteIcon 
               onClick={() => onEliminarHoraHandler(params.row.id, params.row.proyecto, params.row.tarea)} 
               />
             </IconButton> 
              <IconButton color="warning"  aria-label="edit">
               <EditIcon 
               onClick={() => onEditarHoraHandler()}
               />
             </IconButton> 
           </>
         )
      }
    }
  ]
  const onEliminarTicketModalHandler = () => {
    fetch(`https://api-recursos.herokuapp.com/recursos/EliminarHoras/${horaABorrar.id}`, { method: 'DELETE' })
      .then(() => obtenerHoras());
  }
  const content = (codigoProyecto, codigoTarea) => {
    return (
      <>
        <p style={{ textAlign: 'center' }} >¿Desea eliminar la carga de horas asociado al Proyecto {codigoProyecto} y tarea {codigoTarea}? </p>
        <p><center> <strong> Esta acción no será reversible </strong></center></p>
      </>
    )
  }
  return (
    <>
      <div style={{  textAlign: 'center' }}><h2>Horas trabajadas: {nombre_persona}</h2></div>
      <div style={{ textAlign: 'right' }}><h2>Horas totales: {horas_persona}</h2></div>
      <ConfirmModal
        content={content(horaABorrar?.proyecto, horaABorrar?.tarea)}
        open={showModal}
        textoConfirmar="Eliminar"
        textoCancelar="Cancelar"
        setOpen={setShowModal}
        onConfirm={onEliminarTicketModalHandler}
      />
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
        
            <QuickFilteringGrid data={horas} columns={columns} />
                
      </div>

    </>
  )
}
export default ConsultarHoras;
