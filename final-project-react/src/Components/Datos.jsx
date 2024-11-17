import React, { useEffect } from 'react';
import { useAppContext, setTableData, setPagination } from '../Context/AppContextProvider';
import datos from '../Data/presas_jal_ldcjl_lago_de_chapala_almacenamiento_historico_2024-08-01.json'; // Importa el JSON directamente
import './Datos.css';

const Datos = ({ rowsPerPage = 100 }) => {
  const { state, dispatch } = useAppContext();

  const totalPages = Math.ceil(state.tableData.length / rowsPerPage);
  const maxVisiblePages = 5; // Máximo número de páginas visibles

  useEffect(() => {
    // Cargar los datos de la tabla al contexto global
    setTableData(dispatch, datos);

    // Configurar la paginación solo si no está configurada aún
    if (state.pagination.rowsPerPage !== rowsPerPage) {
      setPagination(dispatch, {
        ...state.pagination,
        rowsPerPage,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, datos, rowsPerPage]);

  // Obtener datos paginados
  const paginatedData = state.tableData.slice(
    (state.pagination.currentPage - 1) * state.pagination.rowsPerPage,
    state.pagination.currentPage * state.pagination.rowsPerPage
  );

  const handlePageChange = (page) => {
    setPagination(dispatch, { ...state.pagination, currentPage: page });
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
                Object.keys(state.tableData[0]).map((key) => <th key={key}>{key}</th>)}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, i) => (
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





