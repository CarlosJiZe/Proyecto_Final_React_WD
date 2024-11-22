import React, { useState, useEffect } from 'react';
import { Bar, Line, Doughnut } from 'react-chartjs-2';  // Cambiado de Pie a Doughnut
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, RadialLinearScale, PointElement, LineElement, ArcElement } from 'chart.js';
import './Grafs.css';
import { setGraphData,useAppContext } from '../Context/AppContextProvider';

// Registramos los componentes de Chart.js necesarios
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,  // Necesario para el radar
  PointElement,       // Necesario para el radar
  LineElement,        // Necesario para el radar
  ArcElement          // Necesario para el radar
);

const Grafs = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('Data/presas_jal_ldcjl_lago_de_chapala_almacenamiento_historico_2024-08-01.json');
        const data = await response.json();

        // Filtrar los datos para que solo se muestren los últimos 10 años
        const filteredData = data.filter(item => {
          const currentYear = new Date().getFullYear();
          const itemYear = new Date(item.fecha).getFullYear();
          return itemYear >= currentYear; // Filtra por los últimos 10 años
        });

        // Obtener el último día disponible
        const latestData = filteredData[filteredData.length - 1];

        // Formatear los datos para los gráficos
        const barChartData = {
          labels: filteredData.map(item => item.fecha),
          datasets: [
            {
              label: 'Almacenamiento (hm³)',
              data: filteredData.map(item => item.almacenamiento_hm3),
              backgroundColor: 'rgba(75, 192, 192, 1)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        };

        const lineChartData = {
          labels: filteredData.map(item => item.fecha),
          datasets: [
            {
              label: 'Elevación (msnm)',
              data: filteredData.map(item => item.elevacion_msnm),
              fill: false,
              borderColor: 'rgba(153, 102, 255, 1)',
              tension: 0.1,
            },
          ],
        };

        // Gráfica de porcentaje de llenado: solo con el último dato
        const doughnutChartData = {
          labels: ['Porcentaje de Llenado'],
          datasets: [
            {
              label: 'Porcentaje de Llenado',
              data: [latestData.porcentaje_llenado * 100, 100 - latestData.porcentaje_llenado * 100], // Solo el último dato
              backgroundColor: [
                'rgba(75, 192, 192, 0.6)',
                'rgba(169, 169, 169, 0.2)',  // Color para el espacio vacío
              ],
              borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(169, 169, 169, 1)',
              ],
              borderWidth: 2,
              hoverOffset: 4,
            },
          ],
        };

        // Gráfica de comparación de almacenamiento y elevación: solo con el último dato
        const barChartComparisonData = {
          labels: ['Almacenamiento (hm³)', 'Elevación (msnm)'],
          datasets: [
            {
              label: 'Datos del Lago de Chapala',
              data: [
                latestData.almacenamiento_hm3,
                latestData.elevacion_msnm,
              ],
              backgroundColor: 'rgba(75, 192, 192, 1)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        };

        setChartData({
          barChartData,
          lineChartData,
          doughnutChartData,  // Usamos Doughnut aquí
          barChartComparisonData,
        });
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    };

    fetchData();
  }, []);

  if (!chartData) {
    return <p>Cargando los datos...</p>;
  }

  return (
    <div className="grafica-section">
      <div className="chart-container">
        <h3>Almacenamiento a lo largo del tiempo</h3>
        <Bar data={chartData.barChartData} options={{ responsive: true }} />
      </div>

      <div className="chart-container">
        <h3>Elevación a lo largo del tiempo</h3>
        <Line data={chartData.lineChartData} options={{ responsive: true }} />
      </div>

      <div className="chart-container">
        <h3>Porcentaje de Llenado</h3>
        <Doughnut data={chartData.doughnutChartData} options={{ responsive: true }} /> {/* Cambiado a Doughnut */}
      </div>
    </div>
  );
};

export default Grafs;
