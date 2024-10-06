import React, { Component } from 'react';
import axios from 'axios';

class EntryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: '',
      error: '',
      submitting: false,
      currentDate: new Date().toLocaleDateString(),
      greeting: this.getGreeting(),
    };
  }

  getGreeting() {
    const hours = new Date().getHours();
    if (hours < 12) return '🌅 Good Morning!';
    if (hours < 18) return '☀️ Good Afternoon!';
    return '🌙 Good Evening!';
  }

  handleChange = (e) => {
    this.setState({ entry: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { entry } = this.state;
    const { token } = this.props;

    this.setState({ submitting: true });

    try {
      await axios.post('http://localhost:5000/api/entries', { entry }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      this.setState({ 
        entry: '', 
        error: '',
        submitting: false
      });
    } catch (err) {
      this.setState({ 
        error: err.response?.data?.error || 'Failed to save entry',
        submitting: false
      });
    }
  };

  render() {
    const { entry, error, submitting, currentDate, greeting } = this.state;

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-purple-500/20 p-8">
            {/* Header Section */}
            <div className="mb-8 text-center">
              <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
                Capture Your Emotions
              </h2>
              <div className="flex justify-between items-center">
                <p className="text-purple-300 text-xl">{greeting}</p>
                <p className="text-gray-400">{currentDate}</p>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500 rounded-lg">
                <p className="text-red-400">{error}</p>
              </div>
            )}

            {/* Entry Form */}
            <form onSubmit={this.handleSubmit} className="space-y-6">
              <div>
                <label className="block text-purple-300 text-lg font-medium mb-2">
                  How are you feeling today?
                </label>
                <textarea
                  value={entry}
                  onChange={this.handleChange}
                  className="w-full px-4 py-3 bg-black/20 border border-purple-500/20 rounded-lg 
                          text-white placeholder-gray-400
                          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                          transition-all duration-300"
                  rows="6"
                  placeholder="Express yourself freely..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg
                        font-semibold text-lg
                        hover:from-purple-600 hover:to-pink-600
                        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900
                        transition-all duration-300 transform hover:scale-[1.02]
                        disabled:opacity-50 disabled:cursor-not-allowed
                        flex justify-center items-center"
              >
                {submitting ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
                ) : (
                  'Save Entry'
                )}
              </button>
            </form>

            {/* Decorative Element */}
            <div className="mt-8 pt-8 border-t border-purple-500/20 text-center">
              <p className="text-gray-400 italic">
                "Every entry is a step in your emotional journey."
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EntryForm;