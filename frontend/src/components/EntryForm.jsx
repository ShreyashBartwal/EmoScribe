import React, { Component } from 'react';
import axios from 'axios';

class EntryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: '',
      error: '',
    };
  }

  handleChange = (e) => {
    this.setState({ entry: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { entry } = this.state;
    const { token } = this.props;

    try {
      await axios.post('http://localhost:5000/api/entries', { entry }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      this.setState({ entry: '', error: '' });
    } catch (err) {
      this.setState({ error: err.response?.data?.error || 'Failed to save entry' });
    }
  };

  render() {
    const { entry, error } = this.state;

    return (
      <div className="max-w-lg mx-auto mt-12 p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Write Your Entry</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={this.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-lg font-medium mb-2">Entry</label>
            <textarea
              value={entry}
              onChange={this.handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              rows="6"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            Save Entry
          </button>
        </form>
      </div>
    );
  }
}

export default EntryForm;
