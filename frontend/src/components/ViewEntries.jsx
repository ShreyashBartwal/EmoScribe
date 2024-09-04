import React, { Component } from 'react';
import axios from 'axios';

class ViewEntries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      error: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchEntries();
  }

  fetchEntries = async () => {
    const { token } = this.props;
    try {
      const response = await axios.get('http://localhost:5000/api/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      this.setState({ entries: response.data, loading: false });
    } catch (err) {
      this.setState({ error: err.response?.data?.error || 'Failed to fetch entries', loading: false });
    }
  };

  render() {
    const { entries, error, loading } = this.state;

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
  }
}

export default ViewEntries;
