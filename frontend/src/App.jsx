import React, { useState, useEffect } from "react";
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
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogin = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const handleRegister = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>EmoScribe</h1>
          {token && (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}
          <Routes>
            {!token ? (
              <Route
                path="/"
                element={
                  <div className="flex flex-col items-center">
                    {showLogin ? (
                      <>
                        <Login onLogin={handleLogin} />
                        <div className="mt-4 text-center">
                          <p className="text-sm text-gray-600">
                            Don't have an account?{" "}
                            <span
                              onClick={() => setShowLogin(false)}
                              className="text-blue-600 hover:underline cursor-pointer"
                            >
                              Sign up
                            </span>
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <Register onRegister={handleRegister} />
                        <div className="mt-4 text-center">
                          <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <span
                              onClick={() => setShowLogin(true)}
                              className="text-blue-600 hover:underline cursor-pointer"
                            >
                              Login
                            </span>
                          </p>
                        </div>
                      </>
                    )}
                  </div>
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
