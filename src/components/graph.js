import React, { useState, useEffect, useRef } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, PieController } from 'chart.js';
import './graph.css';

// Registrar los componentes de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, PieController);

export const Graph = () => {
  const [data, setData] = useState({
    labels: ["Lista #1", "Lista 2"],
    datasets: [
      {
        data: [0, 0], // Inicialmente, los votos son 0
        backgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  });

  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/get_votes_data");
        const result = await response.json();

        const lista1Votes = result.find(item => item.nombre_lista === "Lista #1")?.votos || 0;
        const lista2Votes = result.find(item => item.nombre_lista === "Lista 2")?.votos || 0;

        setData({
          labels: ["Lista #1", "Lista 2"],
          datasets: [
            {
              data: [lista1Votes, lista2Votes],
              backgroundColor: ["#FF6384", "#36A2EB"],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data initially and then every 5 seconds
    fetchData();
    const interval = setInterval(fetchData, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = document.getElementById('pieChart').getContext('2d');

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new ChartJS(ctx, {
      type: 'pie',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            enabled: true,
          },
        },
        animation: {
          duration: 1000, // Duración de la animación en milisegundos
          easing: 'easeOutBounce', // Tipo de animación
        },
      },
    });

    // Cleanup function to destroy the chart
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="graph-container">
      <h2>Gráfica de Pastel de Votos por Equipo</h2>
      <canvas id="pieChart"></canvas>
    </div>
  );
};



