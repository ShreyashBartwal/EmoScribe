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
      
      // Sort entries by createdAt date in descending order
      const sortedEntries = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      this.setState({ entries: sortedEntries, loading: false });
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

  getSentimentEmoji = (score) => {
    if (score > 0) return '😊';
    if (score < 0) return '😔';
    return '😐';
  };

  render() {
    const { entries, error, loading, selectedEntry } = this.state;

    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      );
    }

    return (
      <div className="container max-w-screen-2xl px-4 py-8">
        <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
          Your Emotional Journey
        </h2>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        {entries.length === 0 ? (
          <div className="text-gray-300 text-center py-12 bg-white/5 rounded-lg backdrop-blur-sm">
            <p className="text-2xl mb-2">✏️</p>
            <p className="text-xl">No entries found. Start your journey by adding a new entry!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {entries.map(entry => (
              <div
                key={entry._id}
                className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:bg-white/10"
                onClick={() => this.handleEntryClick(entry)}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-2xl">
                      {this.getSentimentEmoji(entry.sentiment?.score)}
                    </span>
                    <span className="text-sm text-purple-300">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-white font-medium mb-4 line-clamp-3">{entry.entry}</p>
                  <div className="text-gray-400 text-sm">
                    <p className="mb-1">Sentiment Score: {entry.sentiment?.score.toFixed(2)}</p>
                    <p>
                      {entry.sentiment?.positive?.length > 0 && (
                        <span className="text-green-400 mr-2">
                          +{entry.sentiment.positive.length}
                        </span>
                      )}
                      {entry.sentiment?.negative?.length > 0 && (
                        <span className="text-red-400">
                          -{entry.sentiment.negative.length}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedEntry && (
          <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gradient-to-br from-gray-900 to-purple-900 p-8 rounded-lg shadow-lg max-w-lg w-full relative border border-purple-500/20">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl transition-colors"
                onClick={this.handleClose}
              >
                ×
              </button>
              <div className="mb-6 flex items-center justify-between">
                <span className="text-3xl mr-4">
                  {this.getSentimentEmoji(selectedEntry.sentiment?.score)}
                </span>
                <span className="text-purple-300">
                  {new Date(selectedEntry.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-white text-lg mb-6">{selectedEntry.entry}</p>
              <div className="bg-black/20 rounded-lg p-4">
                <h3 className="text-purple-300 font-semibold mb-2">Sentiment Analysis</h3>
                <p className="text-gray-300 mb-2">Score: {selectedEntry.sentiment?.score.toFixed(2)}</p>
                <p className="text-gray-300 mb-2">Comparative: {selectedEntry.sentiment?.comparative.toFixed(2)}</p>
                {selectedEntry.sentiment?.positive?.length > 0 && (
                  <p className="text-green-400 mb-2">
                    Positive: {selectedEntry.sentiment.positive.join(', ')}
                  </p>
                )}
                {selectedEntry.sentiment?.negative?.length > 0 && (
                  <p className="text-red-400">
                    Negative: {selectedEntry.sentiment.negative.join(', ')}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default EntryList;