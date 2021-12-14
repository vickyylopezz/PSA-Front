import { Route, Switch } from 'react-router-dom';
import CrearTicket from './pages/Soporte/CrearTicket';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import CargaDeHoras from './pages/Recursos/CargaDeHoras';
import ConsultarProductos from './pages/Soporte/ConsultarProductos';
import ConsultarTickets from './pages/Soporte/ConsultarTickets';
import VerTicket from './pages/Soporte/VerTickets';
import Layout from './components/layout/Layout';
import ConsultarProyectos from './pages/Proyectos/ConsultarProyectos';
import CrearProyecto from './pages/Proyectos/CrearProyecto';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <Home/>
        </Route>
        <Route path='/ver-tickets'>
          <VerTicket />
        </Route>
        <Route path='/crear-ticket'>
          <CrearTicket />
        </Route>
        <Route path='/cargar-horas'>
          <CargaDeHoras />
        </Route>
        <Route path='/consultar-tickets'>
          <ConsultarTickets />
        </Route>
        <Route path='/consultar-productos'>
          <ConsultarProductos />
        </Route>
        <Route path='/consultar-proyectos'>
          <ConsultarProyectos />
        </Route>
        <Route path='/crear-proyecto'>
          <CrearProyecto />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
