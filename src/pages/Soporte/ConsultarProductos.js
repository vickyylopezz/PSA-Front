import React, { useState, useEffect } from 'react';
import QuickFilteringGrid from '../../components/common/DataGrid';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useHistory } from "react-router-dom";

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
    { field: 'nombre', headerName: 'Nombre', sortable: false, width: 150 },
    {
      field: 'version', headerName: 'Version', sortable: false, width: 130,
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
      field: 'acciones', headerName: 'Acciones', sortable: false, width: 300,
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
              codigoProducto: params.row.versionElegida.codigoProducto,
              version: params.row.versionElegida.version
            }
          });
        }

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
              onClick={onCrearTicketHandler}
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
          // setIsLoaded(true);
          setProductos(groupProducts(data));
          // },
          // (error) => {
          //   setIsLoaded(true);
          //   setError(error);
        }
      )
  }, [])

  return (
    <>
      {/* {verTicket && <VerTicket codigoProducto={productoElegido.codigoProducto} version={productoElegido?.version} />} */}
      <QuickFilteringGrid data={productos} columns={columns} />
    </>
  )
}
export default ConsultarProductos;