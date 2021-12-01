import { Route, Switch, Redirect } from 'react-router-dom';
import CrearIncidencia from './pages/CrearIncidencia';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import ConsultarProductos from './pages/ConsultarProductos';
import ConsultarTickets from './pages/ConsultarTickets';
import Layout from './components/layout/Layout';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <Home/>
        </Route>
        <Route path='/crear-incidencia'>
          <CrearIncidencia />
        </Route>
        <Route path='/consultar-tickets'>
          <ConsultarTickets />
        </Route>
        <Route path='/consultar-productos'>
          <ConsultarProductos />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
