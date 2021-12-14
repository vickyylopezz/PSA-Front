import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { useHistory } from "react-router-dom";
import psa from '../../assets/psa.png';

const useStyles = makeStyles((theme) => ({
  flexbox: {
    display: 'flex',
    flexGrow: 1    
  },
  items: {
    flexGrow: 3,
    float: 'right',
    textAlign: 'right'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
    display: 'none',
    [
      theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },

  image: {
    marginRight: theme.spacing(2),
  }
}));

export default function MainNavigation() {
  const classes = useStyles();
  const [showSoporte, setShowSoporte] = useState(false);
  const [showGestionProyectos, setShowGestionProyectos] = useState(false);
  let history = useHistory();

  const redirectHandler = (showMenu, route) => {
    showMenu(false);
    history.push(route);
  }

  return (
    <div className={classes.flexbox}>
      <AppBar position="static">
        <Toolbar>
          <img src={psa} alt="PSA" className={classes.image} />
          <div className={classes.items}>
            <Button
              id="fade-button"
              aria-controls="fade-menu"
              aria-haspopup="true"
              aria-expanded={showSoporte ? 'true' : undefined}
              color="inherit"
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
              <MenuItem onClick={() => redirectHandler(setShowSoporte, '/consultar-tickets')}>Ver asignaciones de tickets</MenuItem>
              <MenuItem onClick={() => redirectHandler(setShowSoporte, '/consultar-productos')}>Consultar productos</MenuItem>
            </Menu>

            <Button
              id="fade-button"
              aria-controls="fade-menu"
              aria-haspopup="true"
              color="inherit"
              onClick={() => redirectHandler(setShowGestionProyectos,'/consultar-proyectos')}
              >
              Gestion de proyectos
            </Button>
            <Button
                id="fade-menu-recursos"
                aria-controls="fade-menu"
                aria-haspopup="true"
                color="inherit"  
                onClick={() => redirectHandler(setShowGestionProyectos,'cargar-horas')}
              >
                Recursos
              </Button>


          </div>

        </Toolbar>
      </AppBar >
    </div >
  );
}
