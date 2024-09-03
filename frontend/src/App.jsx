import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import EntryForm from "./components/EntryForm";
import EntryList from "./components/EntryList";

// Home page component with navigation to WriteEntry and ViewEntries
function HomePage() {
  return (
    <div className="text-center mt-10">
      <h2 className="text-2xl font-semibold mb-4">Welcome to EmoScribe</h2>
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

function App() {
  const [token, setToken] = useState("");
  const [showLogin, setShowLogin] = useState(true); // State to toggle between login and register

  const handleLogin = (token) => {
    setToken(token);
  };

  const handleRegister = (token) => {
    setToken(token);
  };

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>EmoScribe</h1>
          {!token && (
            <button
              onClick={toggleForm}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition"
            >
              {showLogin ? "Switch to Register" : "Switch to Login"}
            </button>
          )}
          <Routes>
            {!token ? (
              <Route
                path="/"
                element={
                  showLogin ? (
                    <Login onLogin={handleLogin} />
                  ) : (
                    <Register onRegister={handleRegister} />
                  )
                }
              />
            ) : (
              <>
                <Route path="/" element={<HomePage />} />
                <Route path="/entries" element={<EntryList token={token} />} />
                <Route path="/new-entry" element={<EntryForm token={token} />} />
              </>
            )}
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
