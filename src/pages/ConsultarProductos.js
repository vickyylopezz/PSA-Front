import React, { useState, useEffect } from 'react';
import QuickFilteringGrid from '../components/common/DataGrid';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const ConsultarProductos = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [productos, setProductos] = useState([]);
  const [versionElegida, setVersionElegida] = useState();

  const contieneProducto = (arr, valor) => {
    return arr.some((value) => { return value.codigoProducto == valor.codigoProducto });
  }

  const groupProducts = (data) => {
    let tempProductos = [];
    data.map((d) => {
      if (contieneProducto(tempProductos, d)) {
        const index = tempProductos.findIndex(value => value.codigoProducto === d.codigoProducto);
        tempProductos[index].version.push({
          id: d.id,
          version: d.version
        });
      } else {
        const prod = {
          codigoProducto: d.codigoProducto,
          id: d.id,
          nombre: d.nombre,
          version: [
            {
              id: d.id,
              version: d.version
            }
          ]
        }
        tempProductos.push(prod);
      }
    })

    return tempProductos;
  };

  const onChangeSelectHandler = (version) => {
    setVersionElegida(version);
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 110, hide: 'true' },
    // {field:'codigoProducto',headerName:'Codigo producto', width:110},
    { field: 'nombre', headerName: 'Nombre', sortable: false, width: 150 },
    {
      field: 'version', headerName: 'Version', sortable: false, width: 150,
      renderCell: (params) => {
        return (
          <Select
            style={{ minWidth: 120 }}
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={versionElegida}
          >
            {params.row.version.map((v) => {
              return (
                <MenuItem onClick={() => onChangeSelectHandler(v.version)} value={v.id}>{v.version}</MenuItem>
              )
            })}

          </Select >
        )
      }
    },
    {
      field: 'acciones', headerName: 'Acciones', sortable: false, width: 300,
      renderCell: (params) => {
        const onVerTicketsHandler = (e) => {
          return alert('hola');
        };
        return (
          <>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={onVerTicketsHandler}
            >
              Ver tickets
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: 16 }}
              onClick={onVerTicketsHandler}
            >
              Crear un nuevo ticket
            </Button>
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
          setIsLoaded(true);
          setProductos(groupProducts(data));
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  return (
    <QuickFilteringGrid data={productos} columns={columns} />
  )
}
export default ConsultarProductos;