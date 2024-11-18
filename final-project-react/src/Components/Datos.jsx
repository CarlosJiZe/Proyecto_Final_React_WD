import React, { useEffect } from 'react';
import { useAppContext, setTableData, setPagination } from '../Context/AppContextProvider';
import axios from 'axios';
import './Datos.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Datos = ({ rowsPerPage = 100 }) => {
  const { state, dispatch } = useAppContext();

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
    // Cargar la primera página al montar el componente
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, rowsPerPage]);

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
    </div>
  );
};

export default Datos;










