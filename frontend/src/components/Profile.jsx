import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the default styles for react-calendar

const Profile = ({ token }) => {
  const [user, setUser] = useState(null);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [markedDates, setMarkedDates] = useState([]);

  // Fetch user profile and entries
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Fetch user profile
        const profileRes = await axios.get('http://localhost:5000/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(profileRes.data);

        // Fetch user entries
        const entriesRes = await axios.get('http://localhost:5000/api/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEntries(entriesRes.data);

        // Extract the dates from the entries and format them as Date objects for the calendar
        const entryDates = entriesRes.data.map((entry) => new Date(entry.createdAt));
        setMarkedDates(entryDates);

        setLoading(false);
      } catch (err) {
        setError('Failed to load profile or entries');
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Function to render custom tiles with marked dates
  const tileContent = ({ date, view }) => {
    if (view === 'month' && markedDates.find((d) => d.toDateString() === date.toDateString())) {
      return <div className="bg-blue-500 w-2 h-2 rounded-full mx-auto"></div>;
    }
    return null;
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      {user && (
        <div className="mb-6">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}
      <h3 className="text-xl font-semibold mb-4">Your Entry Calendar</h3>
      <Calendar
        tileContent={tileContent}
        className="rounded-lg shadow-lg"
      />
    </div>
  );
};

export default Profile;
