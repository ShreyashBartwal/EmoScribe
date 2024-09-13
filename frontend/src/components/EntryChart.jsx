// src/components/EntryChart.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const EntryChart = ({ token }) => {
  const [entries, setEntries] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEntries(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load entries');
        setLoading(false);
      }
    };

    fetchEntries();
  }, [token]);

  useEffect(() => {
    if (entries.length > 0) {
      // Prepare data for the chart
      const labels = entries.map((entry) => new Date(entry.createdAt).toLocaleDateString());
      const data = entries.map((entry) => entry.sentiment.score);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Sentiment Score',
            data,
            fill: false,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            tension: 0.1,
          },
        ],
      });
    }
  }, [entries]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Mood Sentiment Over Time</h2>
      {chartData && (
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Your Sentiment Over Time, higher sentiment score means a happy mood',
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Sentiment Score',
                },
              },
              x: {
                title: {
                  display: true,
                  text: 'Date',
                },
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default EntryChart;
