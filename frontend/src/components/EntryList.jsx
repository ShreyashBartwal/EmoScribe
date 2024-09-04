import { useEffect, useState } from "react";
import axios from "axios";

function EntryList({ token }) {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEntries(response.data);
      } catch (err) {
        console.error("Failed to fetch entries:", err);
      }
    };

    fetchEntries();
  }, [token]);

  const handleSelect = (entry) => {
    setSelectedEntry(entry._id === selectedEntry ? null : entry._id);
  };

  return (
    <div className="max-w-6xl mx-auto mt-12 p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Entries</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {entries.map((entry) => (
          <div
            key={entry._id}
            onClick={() => handleSelect(entry)}
            className={`cursor-pointer transition-transform duration-300 ease-in-out transform ${
              selectedEntry === entry._id ? "scale-105" : "scale-100"
            } p-6 border border-gray-300 rounded-lg shadow-lg hover:shadow-xl`}
          >
            <p className="text-gray-800 text-lg mb-2">{entry.entry}</p>
            {selectedEntry === entry._id && (
              <div className="mt-4 text-gray-600">
                <p className="mb-2">Sentiment Score: {entry.sentiment.score}</p>
                <p className="mb-2">Comparative: {entry.sentiment.comparative}</p>
                <p className="mb-2">Positive Words: {entry.sentiment.positive.join(", ")}</p>
                <p>Negative Words: {entry.sentiment.negative.join(", ")}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EntryList;
