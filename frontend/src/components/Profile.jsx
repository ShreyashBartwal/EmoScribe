import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Recommendation from './Recommendation';

// Custom CSS for the calendar to match our theme
const calendarStyles = `
  .react-calendar {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 0.5rem;
    color: white;
    max-width: 100%; /* Ensure the calendar does not exceed its container */
    overflow: hidden; /* Prevent overflow */
  }
  .react-calendar__tile {
    color: #e5e7eb;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: rgba(139, 92, 246, 0.2);
  }
  .react-calendar__tile--active {
    background: #8b5cf6 !important;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: rgba(139, 92, 246, 0.2);
  }
  .react-calendar__tile--now {
    background: rgba(139, 92, 246, 0.3);
  }
`;

const Profile = ({ token }) => {
  const [user, setUser] = useState(null);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [markedDates, setMarkedDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredEntries, setFilteredEntries] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const [profileRes, entriesRes] = await Promise.all([
          axios.get('http://localhost:5000/api/profile', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:5000/api/', {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);

        setUser(profileRes.data);
        setEntries(entriesRes.data);
        setMarkedDates(entriesRes.data.map((entry) => new Date(entry.createdAt)));
      } catch (err) {
        setError('Failed to load profile or entries');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const filtered = entries.filter(entry => {
      const entryDate = new Date(entry.createdAt);
      return (
        entryDate.getFullYear() === date.getFullYear() &&
        entryDate.getMonth() === date.getMonth() &&
        entryDate.getDate() === date.getDate()
      );
    });
    setFilteredEntries(filtered);
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month' && markedDates.some((d) => d.toDateString() === date.toDateString())) {
      return <div className="bg-purple-400 w-1.5 h-1.5 rounded-full mx-auto"></div>;
    }
    return null;
  };

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
    <div className="container mx-auto px-4 py-8 max-w-full overflow-hidden">
      <style>{calendarStyles}</style>
      
      <div className="max-w-fit mx-auto">
        <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
          Your Emotional Journey
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-purple-500/20 overflow-hidden">
            <h3 className="text-xl font-semibold mb-4 text-purple-300">Profile Details</h3>
            {user && (
              <div className="space-y-2">
                <p className="text-gray-300"><span className="text-white font-medium">Name:</span> {user.name}</p>
                <p className="text-gray-300"><span className="text-white font-medium">Email:</span> {user.email}</p>
              </div>
            )}
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-purple-500/20 overflow-hidden">
            <h3 className="text-xl font-semibold mb-4 text-purple-300">Entry Calendar</h3>
            <div className="overflow-hidden"> {/* Add overflow hidden here */}
              <Calendar
                onChange={handleDateChange}
                tileContent={tileContent}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {selectedDate && (
          <div className="mt-8 bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-purple-500/20 overflow-hidden">
            <h4 className="text-xl font-semibold mb-4 text-purple-300">
              Entries for {selectedDate.toDateString()}
            </h4>
            {filteredEntries.length > 0 ? (
              <div className="space-y-4">
                {filteredEntries.map(entry => (
                  <div key={entry._id} className="bg-black/20 p-4 rounded-lg">
                    <p className="text-white mb-2">{entry.entry}</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-purple-300">
                        Sentiment: {entry.sentiment?.score > 0 ? '😊' : entry.sentiment?.score < 0 ? '😔' : '😐'}
                        {' '}{entry.sentiment?.score.toFixed(2)}
                      </span>
                      <span className="text-gray-400">
                        {new Date(entry.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No entries found for this date.</p>
            )}
          </div>
        )}

        <div className="mt-8">
          <Recommendation entries={filteredEntries} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
