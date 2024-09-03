import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewEntries = () => {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/entries', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setEntries(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch entries');
      }
    };

    fetchEntries();
  }, []);

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
              <p>{entry.entry}</p>
              <p className="text-gray-500 text-sm mt-2">Sentiment: {entry.sentiment.score.toFixed(2)}</p>
              <p className="text-gray-500 text-sm">Created at: {new Date(entry.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewEntries;
