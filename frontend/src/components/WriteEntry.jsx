import React, { useState } from 'react';
import axios from 'axios';

const WriteEntry = () => {
  const [entry, setEntry] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/entries', { entry }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setSuccess('Entry saved successfully!');
      setEntry('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save entry');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border border-gray-200 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Write Entry</h2>
      {success && <p className="text-green-500">{success}</p>}
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Entry</label>
          <textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            rows="6"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default WriteEntry;
