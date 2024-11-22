import React, { useEffect } from 'react';
import { useAppContext, setTableData, setPagination, login, logout  } from '../Context/AppContextProvider';
import axios from 'axios';
import './Datos.css';
import { Modal, Button } from 'react-bootstrap';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Datos = ({ rowsPerPage = 100 }) => {
  const { state, dispatch, showModal, hideModal} = useAppContext();

  const totalPages = state.pagination.totalPages || 1; // Total de páginas
  const maxVisiblePages = 5; // Máximo número de páginas visibles

  // Función para cargar datos desde el backend
  const fetchData = async (page = 1) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/datos?page=${page}&limit=${rowsPerPage}`);
      const fetchedData = response.data.data.map((row) => ({
        ...row,
        fecha: new Date(row.fecha).toLocaleDateString(), // Formatea la fecha
      }));
      setTableData(dispatch, fetchedData); // Actualiza `tableData` con los datos formateados
      setPagination(dispatch, {
        ...state.pagination,
        currentPage: response.data.currentPage, // Actualiza la página actual
        totalPages: response.data.totalPages,  // Total de páginas desde la respuesta
        rowsPerPage: rowsPerPage,
      });
    } catch (error) {
      console.error('Error al obtener los datos del backend:', error);
    }
  };

  useEffect(() => {
    // Cargar la primera página solo si el usuario está autenticado
    if (state.isLoggedIn) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, rowsPerPage, state.isLoggedIn]);

  // Manejar cambio de página
  const handlePageChange = (page) => {
    fetchData(page); // Solicitar datos de la nueva página
    setPagination(dispatch, { ...state.pagination, currentPage: page }); // Actualizar el estado de la paginación
  };

  // Calcular el rango de páginas visibles
  const getVisiblePages = () => {
    const startPage = Math.max(1, state.pagination.currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    const adjustedStartPage = Math.max(1, endPage - maxVisiblePages + 1);

    return Array.from({ length: endPage - adjustedStartPage + 1 }, (_, i) => adjustedStartPage + i);
  };

  const handleDownload = () => {
    // Muestra el modal de confirmación
    showModal(dispatch);
  };

  const handleConfirmDownload = () => {
    // Aquí inicias la descarga
    const link = document.createElement('a');
    link.href = '/data/presas_jal_ldcjl_lago_de_chapala_almacenamiento_historico_2024-08-01.json'; // Ruta del archivo
    link.download = 'datos.csv'; // Nombre del archivo
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    hideModal(dispatch); // Oculta el modal después de la descarga
  };

  const handleClose = () => {
    hideModal(dispatch); // Cierra el modal sin hacer nada
  };

  // Manejar login y logout
  const handleLogin = async () => {
    await login(dispatch, 'Adam'); // Usuario fijo de ejemplo
  };

  const handleLogout = () => {
    logout(dispatch);
  };

  if (!state.isLoggedIn) {
    return (
      <div className="datos-section">
        <div className="section">
          <h1>Datos</h1>
          <div className="textDecr">
            <p className="princ">
              Para acceder a los datos, debes iniciar sesión.
            </p>
          </div>
          <button className="btn btn-primary" onClick={handleLogin}>
            Iniciar Sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="datos-section">
      <div className="section">
        <br />
        <h1>Datos</h1>
        <div className="textDecr">
          <p className="princ">
            En esta sección se pueden consultar los datos utilizados en las Gráficas.
          </p>
        </div>
        {/* Botón para descargar archivo */}
        <div className="download-section">
          <button className="btn btn-primary btn-circle" onClick={handleDownload}>
            <i className='fas fa-download'></i>
          </button>

          {/* Modal de confirmación */}
          <Modal className='CuadroConfirmacion' show={state.isModalVisible} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmar descarga</Modal.Title>
            </Modal.Header>
            <Modal.Body>¿Estás seguro de que deseas descargar el archivo?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleConfirmDownload}>
                Sí, descargar
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      {/* Tabla de datos */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-sm text-white">
          <thead className="thead-dark">
            <tr>
              {state.tableData.length > 0 &&
                Object.keys(state.tableData[0])
                  .filter((key) => key !== '_id' && key !== '__v') // Excluir columnas no deseadas
                  .map((key) => <th key={key}>{key}</th>)}
            </tr>
          </thead>
          <tbody>
            {state.tableData.map((row, index) => (
              <tr key={index}>
                {Object.entries(row)
                  .filter(([key]) => key !== '_id' && key !== '__v') // Excluir columnas no deseadas
                  .map(([key, value], i) => (
                    <td key={i}>{value}</td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          {/* Primera Página */}
          {state.pagination.currentPage > 1 && (
            <li className="page-item">
              <button className="page-link" onClick={() => handlePageChange(1)}>
                ⏪️
              </button>
            </li>
          )}

          {/* Página Anterior */}
          {state.pagination.currentPage > 1 && (
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => handlePageChange(state.pagination.currentPage - 1)}
              >
                ⬅️
              </button>
            </li>
          )}

          {/* Páginas Visibles */}
          {getVisiblePages().map((page) => (
            <li
              key={page}
              className={`page-item ${page === state.pagination.currentPage ? 'active' : ''}`}
            >
              <button className="page-link" onClick={() => handlePageChange(page)}>
                {page}
              </button>
            </li>
          ))}

          {/* Página Siguiente */}
          {state.pagination.currentPage < totalPages && (
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => handlePageChange(state.pagination.currentPage + 1)}
              >
                ➡️
              </button>
            </li>
          )}

          {/* Última Página */}
          {state.pagination.currentPage < totalPages && (
            <li className="page-item">
              <button className="page-link" onClick={() => handlePageChange(totalPages)}>
                ⏩️
              </button>
            </li>
          )}
        </ul>
      </nav>
      <button className="btn btn-danger" onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Datos;











