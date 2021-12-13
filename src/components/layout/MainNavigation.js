import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import psa from '../../assets/psa.png';
import classes from './MainNavigation.module.css';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { useHistory } from "react-router-dom";

const MainNavigation = () => {
  const [showSoporte, setShowSoporte] = useState(false);
  const [showGestionProyectos, setShowGestionProyectos] = useState(false);
  let history = useHistory();

  const redirectHandler = (showMenu,route) => {
    showMenu(false);
    history.push(route);
  }

  return (
    <header className={classes.header}>
      <img src={psa} alt="PSA" />
      <nav className={classes.nav}>
        <ul>
          <li>
            <div>
              <Button
                id="fade-button"
                aria-controls="fade-menu"
                aria-haspopup="true"
                aria-expanded={showSoporte ? 'true' : undefined}
                onClick={(event) => setShowSoporte(event.currentTarget)}
              >
                Soporte
              </Button>
              <Menu
                id="fade-menu-soporte"
                MenuListProps={{
                  'aria-labelledby': 'fade-button',
                }}
                anchorEl={showSoporte}
                open={showSoporte}
                onClose={() => setShowSoporte(false)}
                TransitionComponent={Fade}
              >
                <MenuItem onClick={() => redirectHandler(setShowSoporte,'/crear-incidencia')}>Crear incidencia</MenuItem>
                <MenuItem onClick={() => redirectHandler(setShowSoporte,'/consultar-tickets')}>Consultar tickets</MenuItem>
                <MenuItem onClick={() => redirectHandler(setShowSoporte,'/consultar-productos')}>Consultar productos</MenuItem>
              </Menu>
            </div>

          </li>

          <li>
            <NavLink to='/new-quote'>
              <div>
                <Button
                  id="fade-button"
                  aria-controls="fade-menu"
                  aria-haspopup="true"
                  aria-expanded={showGestionProyectos ? 'true' : undefined}
                  onClick={(event) => setShowGestionProyectos(event.currentTarget)}
                >
                  Gestion de proyectos
                </Button>
                <Menu
                  id="fade-menu-soporte"
                  MenuListProps={{
                    'aria-labelledby': 'fade-button',
                  }}
                  anchorEl={showGestionProyectos}
                  open={showGestionProyectos}
                  onClose={() => setShowGestionProyectos(false)}
                  TransitionComponent={Fade}
                >
                  <MenuItem onClick={() => redirectHandler(setShowGestionProyectos,'/ejemplo')}>Ejemplo1</MenuItem>
                  <MenuItem onClick={() => redirectHandler(setShowGestionProyectos,'/ejemplo')}>Ejemplo2</MenuItem>
                </Menu>
              </div>
            </NavLink>
          </li>
          <li>
            <div>
              <Button
                id="fade-button"
                aria-controls="fade-menu"
                aria-haspopup="true"   
                onClick={() => redirectHandler(setShowGestionProyectos,'cargar-horas')}
              >
                Recursos
              </Button>
            </div>        
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
