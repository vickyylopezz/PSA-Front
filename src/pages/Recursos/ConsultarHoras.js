import React, { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";

const ConsultarHoras = (props) => {

  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

ConsultarHoras.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, tarea, horas, fecha) {
  return { name, tarea, horas, fecha };
}
/* 
Tenmos id de usuario -> pedir las horas-> id de proyectos y Tareay tenemos la fecha de carga
Pedir cuales nos solos proyectos y las tareas con los ids (pedir nombre)
*/
const rows = [
  createData('PSA', 'Resolver tickest', 4, 15),
  createData('PSA', 'Tarea 1', 3, 1),
  createData('Samkert', 'Tarea 2', 16, 1),
  createData('PSAA', 'Tarea 3', 6,1),
  createData('Proyecto 1', 'Tarea 4', 2, 1),
  createData('Proyecto 2', 'Tarea 6', 3, 4),
  createData('Proyecto 4', 'Tarea 7', 9, 1),
  createData('Proyecto 5', 'Tarea 8', 1, 1),
  createData('Proyecto 6', 'Tarea 9', 14, 6),
  createData('Proyecto 7', 'Tarea 10', 2, 8),
  createData('Proyecto 8', 'Tarea 11', 5, 4),
  createData('Proyecto 9', 'Tarea 12', 12, 1),
  createData('Proyecto 10', 'Tarea 13', 7, 1),
].sort((a, b) => (a.horas < b.horas ? -1 : 1));

export default function CustomPaginationActionsTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  let history = useHistory();
  return (   
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
      <div style={{ textAlign: 'center' }}><h1>Horas Cargadas </h1></div>
      <div style={{ padding: 16, margin: 'auto' }}>
          <div style={{ float: 'right' }}>
            <Button variant="contained"
              style={{right: 0}}
              color="primary"
              size="small"
              style={{ marginLeft: 16 }}
              onClick={() => history.push('/carga-horas')}>Cargar Horas
            </Button>
          </div>
        </div> 
    <div style={{ marginTop: 35 }}>     
      <TableContainer component={Paper}>
      <Table aria-label="custom pagination table">
        <TableHead>
        <TableRow>
            <TableCell>Proyecto</TableCell>
            <TableCell align="right">Tarea</TableCell>
            <TableCell align="right">Horas </TableCell>
            <TableCell align="right">Fecha </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.name}>
              <TableCell style={{ width: 130 }} component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell style={{ width: 180 }} align="right">
                {row.tarea}
              </TableCell>
              <TableCell style={{ width: 100 }} align="right">
                {row.horas}
              </TableCell>
              <TableCell style={{ width: 180 }} align="right">
                {row.fecha}
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={ConsultarHoras}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </div> 
      </Container>
    </React.Fragment>
  
     );
};
