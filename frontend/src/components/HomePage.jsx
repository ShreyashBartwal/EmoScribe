import React from 'react';
import { Link } from 'react-router-dom';

class HomePage extends React.Component {
  render() {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-semibold mb-4">Welcome to EmoScribe</h2>
        <h2 className="text-2xl font-semibold mb-4">Where positivity matters!</h2>
        <p className="font-semibold">This is an AI driven Mood Diary where you can enter your entries of how you feel and all the things that are happening in your life!</p>
        <br />
        <div className="space-x-4">
          <Link
            to="/new-entry"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Write New Entry
          </Link>
          <Link
            to="/entries"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            View Entries
          </Link>
        </div>
      </div>
    );
  }
}

export default HomePage;
