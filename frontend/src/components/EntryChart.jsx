import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

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
      const labels = entries.map((entry) => new Date(entry.createdAt).toLocaleDateString());
      const data = entries.map((entry) => entry.sentiment.score);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Emotional Journey',
            data,
            fill: true,
            backgroundColor: 'rgba(139, 92, 246, 0.1)', // Purple with transparency
            borderColor: 'rgba(216, 180, 254, 1)', // Lighter purple for the line
            borderWidth: 2,
            pointBackgroundColor: 'rgba(216, 180, 254, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(139, 92, 246, 1)',
            tension: 0.4,
          },
        ],
      });
    }
  }, [entries]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500 text-red-400 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-purple-500/20 p-8">
          <h2 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
            Your Emotional Journey
          </h2>
          
          {chartData ? (
            <div className="mt-8">
              <Line
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      backgroundColor: 'rgba(17, 24, 39, 0.8)',
                      titleColor: '#fff',
                      bodyColor: '#fff',
                      borderColor: 'rgba(139, 92, 246, 0.2)',
                      borderWidth: 1,
                      padding: 10,
                      displayColors: false,
                      callbacks: {
                        label: (context) => {
                          const score = context.parsed.y;
                          let mood = score > 0.5 ? '😊 Very Positive' :
                                    score > 0 ? '🙂 Positive' :
                                    score === 0 ? '😐 Neutral' :
                                    score > -0.5 ? '🙁 Negative' : '😔 Very Negative';
                          return `Mood: ${mood} (${score.toFixed(2)})`;
                        }
                      }
                    },
                  },
                  scales: {
                    y: {
                      grid: {
                        color: 'rgba(139, 92, 246, 0.1)',
                      },
                      ticks: {
                        color: '#9CA3AF',
                      },
                      title: {
                        display: true,
                        text: 'Emotional Intensity',
                        color: '#D8B4FE',
                        font: {
                          size: 14,
                          weight: 'bold',
                        },
                      },
                    },
                    x: {
                      grid: {
                        color: 'rgba(139, 92, 246, 0.1)',
                      },
                      ticks: {
                        color: '#9CA3AF',
                        maxRotation: 45,
                        minRotation: 45,
                      },
                    },
                  },
                }}
              />
            </div>
          ) : (
            <div className="text-center text-gray-400 py-12">
              <p className="text-xl">No entries found to display.</p>
              <p className="mt-2">Start journaling to see your emotional journey!</p>
            </div>
          )}
          
          <div className="mt-8 pt-8 border-t border-purple-500/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4">
                <h3 className="text-purple-300 font-semibold mb-2">Total Entries</h3>
                <p className="text-2xl text-white">{entries.length}</p>
              </div>
              <div className="p-4">
                <h3 className="text-purple-300 font-semibold mb-2">Average Mood</h3>
                <p className="text-2xl text-white">
                  {entries.length ? (
                    entries.reduce((acc, entry) => acc + entry.sentiment.score, 0) / entries.length > 0 ? '😊' : '😔'
                  ) : '😐'}
                </p>
              </div>
              <div className="p-4">
                <h3 className="text-purple-300 font-semibold mb-2">Latest Entry</h3>
                <p className="text-2xl text-white">
                  {entries.length ? new Date(entries[0].createdAt).toLocaleDateString() : 'No entries yet'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryChart;