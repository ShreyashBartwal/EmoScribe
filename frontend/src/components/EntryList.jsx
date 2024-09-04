import React, { Component } from 'react';

class EntryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      error: '',
      loading: true,
      selectedEntry: null,
    };
  }

  componentDidMount() {
    this.fetchEntries();
  }

  fetchEntries = async () => {
    try {
      const { token } = this.props;
      const response = await fetch('http://localhost:5000/api/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      this.setState({ entries: data, loading: false });
    } catch (err) {
      this.setState({ error: 'Failed to fetch entries', loading: false });
    }
  };

  handleEntryClick = (entry) => {
    this.setState({ selectedEntry: entry });
  };

  handleClose = () => {
    this.setState({ selectedEntry: null });
  };

  render() {
    const { entries, error, loading, selectedEntry } = this.state;

    if (loading) return <p>Loading...</p>;

    return (
      <div className="relative max-w-2xl mx-auto mt-10 p-4 border border-gray-200 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">View Entries</h2>
        {error && <p className="text-red-500">{error}</p>}
        {entries.length === 0 ? (
          <p>No entries found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {entries.map(entry => (
              <div
                key={entry._id}
                className={`p-4 border border-gray-300 rounded cursor-pointer transform transition-transform duration-300 ease-in-out ${selectedEntry && selectedEntry._id === entry._id ? 'scale-105 shadow-lg' : ''}`}
                onClick={() => this.handleEntryClick(entry)}
              >
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
              </div>
            ))}
          </div>
        )}

        {selectedEntry && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded shadow-lg max-w-lg w-full relative">
              <button
                className="absolute top-4 right-4 text-red-500 text-2xl"
                onClick={this.handleClose}
              >
                &times;
              </button>
              <h2 className="text-2xl font-semibold mb-4">{selectedEntry.entry}</h2>
              <p className="text-gray-500 text-sm mt-2">Sentiment Score: {selectedEntry.sentiment?.score}</p>
              <p className="text-gray-500 text-sm">Comparative: {selectedEntry.sentiment?.comparative}</p>
              <p className="text-gray-500 text-sm">
                Positive Words: {selectedEntry.sentiment?.positive?.length > 0 ? selectedEntry.sentiment.positive.join(', ') : 'None'}
              </p>
              <p className="text-gray-500 text-sm">
                Negative Words: {selectedEntry.sentiment?.negative?.length > 0 ? selectedEntry.sentiment.negative.join(', ') : 'None'}
              </p>
              <p className="text-gray-500 text-sm">Created at: {new Date(selectedEntry.createdAt).toLocaleString()}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default EntryList;
