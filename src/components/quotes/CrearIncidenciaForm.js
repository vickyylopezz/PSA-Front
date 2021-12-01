import { Fragment, useState } from 'react';
import Card from '../UI/Card';
import classes from './CrearIncidenciaForm.module.css';

const CrearIncidenciaForm = (props) => {
  const [isEntering, setIsEntering] = useState(false);

  function submitFormHandler(event) {
    event.preventDefault();
  }

  const finishEnteringHandler = () => {
    setIsEntering(false);
  };

  const formFocusedHandler = () => {
    setIsEntering(true);
  };

  return (
    <Fragment>
      <Card>
        <form
          onFocus={formFocusedHandler}
          className={classes.form}
          onSubmit={submitFormHandler}
        >

          <div className={classes.control}>
            <label htmlFor='crearIncidencia'>Crear Incidencia</label>
            <input type='text' id='crearIncidencia'/>
          </div>

          <div className={classes.control}>
            <label htmlFor='asignarIncidencia'>Asignar incidencia</label>

          </div>


          <div className={classes.control}>
            <label htmlFor='text'>Descripción</label>
            <textarea id='text' rows='5'></textarea>
          </div>

          <div className={classes.actions}>
            <button onClick={finishEnteringHandler} className='btn'>Guardar</button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default CrearIncidenciaForm;
