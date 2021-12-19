import React, { useState, useEffect } from 'react';
import QuickFilteringGrid from '../../components/common/DataGrid';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useHistory } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';


const ConsultarProductos = () => {

  const [productos, setProductos] = useState([]);
  const [productoElegido, setProductoElegido] = useState();
  let history = useHistory();

  const contieneProducto = (arr, valor) => {
    return arr.some((value) => { return value.codigoProducto === valor.codigoProducto });
  }

  const groupProducts = (data) => {
    let tempProductos = [];
    data.map((d) => {
      if (contieneProducto(tempProductos, d)) {
        const index = tempProductos.findIndex(value => value.codigoProducto === d.codigoProducto);
        tempProductos[index].version.push({
          id: d.id,
          version: d.version,
          codigoProducto: d.codigoProducto
        });
      } else {
        const prod = {
          codigoProducto: d.codigoProducto,
          id: d.id,
          nombre: d.nombre,
          version: [
            {
              id: d.id,
              version: d.version,
              codigoProducto: d.codigoProducto
            }
          ],
          versionElegida: null
        }
        tempProductos.push(prod);
      }
    })

    return tempProductos;
  };

  const onChangeSelectHandler = (version, codigoProducto, params) => {
    params.row.versionElegida = {
      codigoProducto: codigoProducto,
      version: version
    };
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 110, hide: 'true' },
    // {field:'codigoProducto',headerName:'Codigo producto', width:110},
    { field: 'nombre', headerName: 'Nombre', sortable: false, flex: 1 },
    {
      field: 'version', headerName: 'Version', sortable: false, flex: 1,
      renderCell: (params) => {
        return (
          <Select
            style={{ minWidth: 120 }}
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={params?.row?.versionElegida?.version}
          >
            {params.row.version.map((v) => {
              return (
                <MenuItem onClick={() => onChangeSelectHandler(v.version, v.codigoProducto, params)} value={v.id}>{v.version}</MenuItem>
              )
            })}
          </Select >
        )
      }
    },
    {
      field: 'acciones', headerName: 'Acciones', sortable: false, flex: 1,
      renderCell: (params) => {
        const onVerTicketsHandler = (event) => {
          event.preventDefault();
          setProductoElegido(params.row.versionElegida)
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
          setProductoElegido(params.row.versionElegida)
          history.push({
            pathname: '/crear-ticket',
            state: {
              readOnly: false,
              ticketId: 0,
              codigoProducto: params.row.versionElegida.codigoProducto,
              version: params.row.versionElegida.version
            }
          });
        }

        return (
          <>
    
            <IconButton 
            variant="contained"
            color="primary" 
            onClick={onVerTicketsHandler} 
            disabled={params.row.versionElegida == null}
            aria-label="delete">
               <VisibilityIcon />
             </IconButton>

          
            <IconButton 
            variant="contained"
            color="success"
            style={{ marginLeft: 16 }}
            onClick={onCrearTicketHandler} 
            disabled={params.row.versionElegida == null}
            aria-label="delete">
               <AddCircleIcon/>
             </IconButton>

          

          </>
        )
      }
    }
  ]

  useEffect(() => {
    fetch("https://aninfo-psa-soporte.herokuapp.com/producto")
      .then(res => res.json())
      .then(
        (data) => {
          setProductos(groupProducts(data));
        }
      )
  }, [])

  return (
    <>
      
      <div style={{ textAlign: 'center' }}><h2>Productos PSA</h2></div>
      <QuickFilteringGrid buscarPor="Buscar por nombre" data={productos} columns={columns} />
    </>
  )
}
export default ConsultarProductos;