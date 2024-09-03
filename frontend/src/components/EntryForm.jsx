import React, { useState } from "react";
import axios from "axios";

function EntryForm({ token }) {
  const [entry, setEntry] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/entries",
        { entry },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEntry(""); // Clear the form on success
    } catch (err) {
      setError(err.response?.data?.error || "Failed to save entry");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border border-gray-200 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Write Entry</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Entry</label>
          <textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            rows="4"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Save Entry
        </button>
      </form>
    </div>
  );
}

export default EntryForm;
