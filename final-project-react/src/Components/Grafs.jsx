import React, { useEffect } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';  // Añadir Line
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';  // Registrar LineElement y PointElement
import { useAppContext, setAllData } from '../Context/AppContextProvider';
import axios from 'axios';
import './Grafs.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement);  // Registrar elementos necesarios para la gráfica de línea

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Grafs = () => {
  const { state, dispatch } = useAppContext();
  const { allData } = state;

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/datos/all`);
        setAllData(dispatch, response.data.data);
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

  // Filtrar datos de los últimos 10 años
  const currentYear = new Date().getFullYear();
  const filteredData = allData.filter((item) => {
    const itemDate = new Date(item.fecha);
    return itemDate.getFullYear() >= currentYear;
  });

  if (filteredData.length === 0) {
    return <p>No hay datos recientes disponibles para generar las gráficas.</p>;
  }

  // Datos para la gráfica de línea
  const lineChartData2 = {
    labels: filteredData.map((item) => new Date(item.fecha).toLocaleDateString()), // Etiquetas (fechas)
    datasets: [
      {
        label: 'Elevación (msnm)', // Cambiar el nombre de 'Almacenamiento'
        data: filteredData.map((item) => item.elevacion_msnm), // Datos de la elevación
        borderColor: 'rgba(75, 192, 192, 1)', // Color de la línea
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Fondo de la línea (opcional)
        fill: false, // No llenar el área bajo la línea
        tension: 0.1, // Suavizar la curva de la línea
      },
    ],
  };

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
    <div className='GrafsSection'>
    <br/>
    <h1>Graficas</h1>
    <div className="grafica-section">
      <div className="chart-container">
        <h3>Almacenamiento a lo largo del tiempo</h3>
        <Bar
          data={barChartData}
          options={{
            responsive: true,
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Fecha (Año)', // Tipo de dato para el eje X
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Almacenamiento (hm³)', // Tipo de dato para el eje Y
                },
              },
            },
            plugins: {
              Legend: {
                position: 'top', // Configura la leyenda
                labels: {
                  generateLabels: function (chart) {
                    const original = ChartJS.overrides.bar.plugins.Legendegend.labels.generateLabels;
                    const labels = original(chart);
                    // Puedes personalizar cómo mostrar las etiquetas si lo deseas
                    return labels;
                  },
                },
              },
            },
          }}
        />
        <p>Esta grafica contiene los niveles de elevacion en msnm a lo largo de este año 2024</p>
      </div>
      <br/>
      <div className="chart-container">
        <h3>Porcentaje de Llenado</h3>
        <Doughnut
          data={doughnutChartData}
          options={{
            responsive: true,
            plugins: {
              Legend: {
                position: 'top', // Configura la leyenda
                labels: {
                  generateLabels: function (chart) {
                    const original = ChartJS.overrides.doughnut.plugins.Legendegend.labels.generateLabels;
                    const labels = original(chart);
                    return labels;
                  },
                },
              },
            },
          }}
        />
         <p>Esta grafica contiene el porcentaje de llenado del Lago de Chapala en este año 2024</p>
      </div>
      <br/>
      <div className="chart-container">
        <h3>Elevación a lo largo del tiempo</h3>
        <Line
          data={lineChartData2}
          options={{
            responsive: true,
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Fecha (Año)', // Tipo de dato para el eje X
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Elevación (msnm)', // Tipo de dato para el eje Y
                },
              },
            },
            plugins: {
              Legend: {
                position: 'top', // Configura la leyenda
                labels: {
                  generateLabels: function (chart) {
                    const original = ChartJS.overrides.line.plugins.Legendegend.labels.generateLabels;
                    const labels = original(chart);
                    return labels;
                  },
                },
              },
            },
          }}
        />
        <p>Esta grafica contiene los niveles de elevacion en msnm del Lago de Chapala en este 2024</p>
      </div>
      <br/>
    </div>
    </div>
  );
};

export default Grafs;
