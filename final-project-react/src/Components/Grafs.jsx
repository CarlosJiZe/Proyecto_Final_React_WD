import React, { useEffect } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useAppContext, setAllData } from '../Context/AppContextProvider';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Grafs = () => {
  const { state, dispatch } = useAppContext();
  const { allData } = state; // Usamos el nuevo estado global `allData`

  useEffect(() => {
    // Cargar todos los datos desde el backend
    const fetchAllData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/datos/all`); // Endpoint sin paginación
        setAllData(dispatch, response.data.data); // Guarda todos los datos en el contexto
      } catch (error) {
        console.error('Error al obtener todos los datos:', error);
      }
    };

    if (!allData || allData.length === 0) {
      fetchAllData();
    }
  }, [allData, dispatch]);

  if (!allData || allData.length === 0) {
    return <p>Cargando todos los datos para las gráficas...</p>;
  }

  console.log('Todos los datos:', allData);

  // Filtrar datos de los últimos 10 años
  const currentYear = new Date().getFullYear();
  const filteredData = allData.filter((item) => {
    const itemDate = new Date(item.fecha);
    return itemDate.getFullYear() >= currentYear - 10;
  });

  if (filteredData.length === 0) {
    return <p>No hay datos recientes disponibles para generar las gráficas.</p>;
  }

  // Datos para las gráficas
  const barChartData = {
    labels: filteredData.map((item) => new Date(item.fecha).toLocaleDateString()),
    datasets: [
      {
        label: 'Almacenamiento (hm³)',
        data: filteredData.map((item) => item.almacenamiento_hm3),
        backgroundColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  const doughnutChartData = {
    labels: ['Porcentaje de Llenado', 'Espacio Vacío'],
    datasets: [
      {
        data: [
          filteredData[filteredData.length - 1].porcentaje_llenado * 100,
          100 - filteredData[filteredData.length - 1].porcentaje_llenado * 100,
        ],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(169, 169, 169, 0.2)'],
      },
    ],
  };

  return (
    <div className="grafica-section">
      <div className="chart-container">
        <h3>Almacenamiento a lo largo del tiempo</h3>
        <Bar data={barChartData} options={{ responsive: true }} />
      </div>

      <div className="chart-container">
        <h3>Porcentaje de Llenado</h3>
        <Doughnut data={doughnutChartData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default Grafs;






