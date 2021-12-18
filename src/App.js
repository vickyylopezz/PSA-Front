import { Route, Switch } from 'react-router-dom';
import CrearTicket from './pages/Soporte/CrearTicket';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import ConsultarHoras from './pages/Recursos/ConsultarHoras';
import CargarHoras from './pages/Recursos/CargarHoras';
import ConsultarProductos from './pages/Soporte/ConsultarProductos';
import ConsultarTickets from './pages/Soporte/ConsultarTickets';
import VerTicket from './pages/Soporte/VerTickets';
import Layout from './components/layout/Layout';
import ConsultarProyectos from './pages/Proyectos/ConsultarProyectos';
import CrearProyecto from './pages/Proyectos/CrearProyecto';
import VerProyecto from './pages/Proyectos/VerProyecto';
import VerTarea from './pages/Proyectos/VerTarea';
import CrearTarea from './pages/Proyectos/CrearTarea';
import EditarProyecto from './pages/Proyectos/EditarProyecto';
import EditarTarea from './pages/Proyectos/EditarTarea';

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
        <Route path='/consultar-horas'>
          <ConsultarHoras />
        </Route> 
        <Route path='/carga-horas'>
          <CargarHoras />
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
        <Route path='/ver-proyecto'>
          <VerProyecto />
        </Route>
        <Route path='/ver-tarea'>
          <VerTarea />
        </Route>
        <Route path='/crear-tarea'>
          <CrearTarea />
        </Route>
        <Route path='/editar-proyecto'>
          <EditarProyecto />
        </Route>
        <Route path='/editar-tarea'>
          <EditarTarea />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
