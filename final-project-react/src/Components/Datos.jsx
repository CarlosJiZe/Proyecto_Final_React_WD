import React, { useState, useEffect } from 'react';
import datos from '../Data/presas_jal_ldcjl_lago_de_chapala_almacenamiento_historico_2024-08-01.json'; // Importa el JSON directamente
import './Datos.css';

const Datos = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const rowsPerPage = props.rowsPerPage; // Obtener filas por página desde props
  const data = datos; // Datos estáticos importados

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const maxVisiblePages = 5; // Máximo número de páginas visibles

  useEffect(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    setPaginatedData(data.slice(startIndex, endIndex));
  }, [currentPage, rowsPerPage, data]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calcular el rango de páginas visibles
  const getVisiblePages = () => {
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    const adjustedStartPage = Math.max(1, endPage - maxVisiblePages + 1);

    return Array.from({ length: endPage - adjustedStartPage + 1 }, (_, i) => adjustedStartPage + i);
  };

  return (
    <div className="datos-section">
      <div className="section">
        <br />
        <h1>Datos</h1>
            <div className='textDecr'>
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
              {data.length > 0 &&
                Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
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
          {currentPage > 1 && (
            <li className="page-item">
              <button className="page-link" onClick={() => handlePageChange(1)}>
                ⏪️
              </button>
            </li>
          )}

          {/* Página Anterior */}
          {currentPage > 1 && (
            <li className="page-item">
              <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                ⬅️
              </button>
            </li>
          )}

          {/* Páginas Visibles */}
          {getVisiblePages().map((page) => (
            <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(page)}>
                {page}
              </button>
            </li>
          ))}

          {/* Página Siguiente */}
          {currentPage < totalPages && (
            <li className="page-item">
              <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                ➡️
              </button>
            </li>
          )}

          {/* Última Página */}
          {currentPage < totalPages && (
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



