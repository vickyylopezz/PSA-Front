import React, { useState, useEffect } from 'react';
import QuickFilteringGrid from '../../components/common/DataGrid';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';

const ConsultarProyectos = () => {

  const [proyectos, setProyectos] = useState([]);
  const [proyectoElegido, setProyectoElegido] = useState();
  let history = useHistory();

  const onChangeSelectHandler = (version, codigoProducto, params) => {
    params.row.versionElegida = {
      codigoProducto: codigoProducto,
      version: version
    };
  }

  const columns = [
    { field: 'id', headerName: 'Codigo', width: 110 },
    { field: 'nombre', headerName: 'Nombre', sortable: false, width: 150 },
    { field: 'liderDeProyecto', headerName: 'Lider', sortable: false, width: 150 },
    { field: 'descripcion', headerName: 'Descripción', sortable: false, width: 200 },
    { field: 'estado', headerName: 'Estado', sortable: false, width: 150 },
    { field: 'fechaCreacion', headerName: 'Fecha de Creación', sortable: false, width: 170 },
    {
      field: 'acciones', headerName: '', sortable: false, width: 60,
      renderCell: (params) => {
          const onVerProyectoHandler = (event) => {
           event.preventDefault();
           setProyectoElegido(params.row.proyectoElegido)
           history.push({
             pathname: '/ver-proyecto',
            //  state: {
            //   //  codigoProyecto: params.row.proyectoElegido.Codigo,
            //   //  version: params.row.proyectoElegido.codigo
            //  }
            state: {
             codigoProyecto: params.row.id, 
             nombreProyecto: params.row.nombre,
             liderProyecto: params.row.liderDeProyecto,
             descripcion: params.row.descripcion,
             estado: params.row.estado,
             fechaCreacion: params.row.fechaCreacion
            }
           });
         };

         return (
           <>
             <IconButton color="primary" onClick={onVerProyectoHandler} aria-label="delete">
               <VisibilityIcon />
             </IconButton>

           </>
         )
       }
    }
  ]

  useEffect(() => {
    fetch("https://modulo-proyectos-squad7.herokuapp.com/proyectos") 
     .then(res => res.json())
      .then(
        (data) => {  setProyectos(data);
        }
      )
  }, [])

  return (
    <>
    <div style={{ textAlign: 'center' }}><h2>Proyectos</h2></div>
      <div style={{ padding: 16, margin: 'auto' }}>
          <div style={{ float: 'right' }}>
            <Button variant="contained"
              
              style={{right: 0}}
              color="primary"
              size="small"
              style={{ marginLeft: 16 }}
              onClick={() => history.push('/crear-proyecto')}>Crear Proyecto
            </Button>
          </div>
        <div style={{ marginTop: 50 }}>    
          <QuickFilteringGrid data={proyectos} columns={columns} />
        </div>
      </div>
      
    </>
  )
}
export default ConsultarProyectos;