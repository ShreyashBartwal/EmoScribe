import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewEntries = () => {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No authentication token found. Please log in.');
          setLoading(false);
          return;
        }

        console.log('Fetching entries...');
        const response = await axios.get('http://localhost:5000/api/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Response:', response.data);
        setEntries(response.data);
      } catch (err) {
        console.error('Error fetching entries:', err);
        if (err.response) {
          console.error('Response data:', err.response.data);
          console.error('Response status:', err.response.status);
          setError(`Failed to fetch entries: ${err.response.data.error || err.response.statusText}`);
        } else if (err.request) {
          console.error('Request made but no response received');
          setError('No response received from server. Please check your connection.');
        } else {
          console.error('Error setting up request:', err.message);
          setError(`Error: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 border border-gray-200 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">View Entries</h2>
      {error && <p className="text-red-500">{error}</p>}
      {entries.length === 0 ? (
        <p>No entries found.</p>
      ) : (
        <ul className="space-y-4">
          {entries.map(entry => (
            <li key={entry._id} className="p-4 border border-gray-300 rounded">
              <p className="font-semibold">{entry.entry}</p>
              <p className="text-gray-500 text-sm mt-2">Sentiment Score: {entry.sentiment?.score}</p>
              <p className="text-gray-500 text-sm">Comparative: {entry.sentiment?.comparative}</p>
              <p className="text-gray-500 text-sm">
                Positive Words: {entry.sentiment?.positive?.length > 0 ? entry.sentiment.positive.join(', ') : 'None'}
              </p>
              <p className="text-gray-500 text-sm">
                Negative Words: {entry.sentiment?.negative?.length > 0 ? entry.sentiment.negative.join(', ') : 'None'}
              </p>
              <p className="text-gray-500 text-sm">Created at: {new Date(entry.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewEntries;