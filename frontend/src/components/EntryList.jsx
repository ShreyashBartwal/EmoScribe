import { useEffect, useState } from "react";
import axios from "axios";

function EntryList({ token }) {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/entries", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEntries(response.data);
      } catch (err) {
        console.error("Failed to fetch entries:", err);
      }
    };

    fetchEntries();
  }, [token]);

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border border-gray-200 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Your Entries</h2>
      <ul>
        {entries.map((entry) => (
          <li key={entry._id} className="mb-4 p-4 border border-gray-300 rounded">
            <p className="text-gray-700">{entry.entry}</p>
            <div className="mt-2">
              <p className="text-gray-600">Sentiment Score: {entry.sentiment.score}</p>
              <p className="text-gray-600">Comparative: {entry.sentiment.comparative}</p>
              <p className="text-gray-600">Positive Words: {entry.sentiment.positive.join(", ")}</p>
              <p className="text-gray-600">Negative Words: {entry.sentiment.negative.join(", ")}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EntryList;
