import React, { useState, useEffect } from 'react';

const ConsultarProductos = () => {
  // '
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    fetch("https://aninfo-psa-soporte.herokuapp.com/producto")
      .then(res => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setProductos(data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul>
        {productos.map(producto => (
          <li key={producto.id}>
            {producto.nombre}
          </li>
        ))}
      </ul>
    );
  }
};
//   return (

//     <>

//       <h1>Pagina de Consulta de productos</h1>
//       {getData()}
//     </>
//   )
// };

export default ConsultarProductos;