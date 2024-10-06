import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
import HomePage from './components/HomePage';
import Profile from './components/Profile';
import EntryChart from './components/EntryChart'; // Import EntryChart
import SideNavbar from './components/SideNavbar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem('token') || '',
      showLogin: true,
    };
  }

  handleLogin = (token) => {
    this.setState({ token });
    localStorage.setItem('token', token);
  };

  handleRegister = (token) => {
    this.setState({ token });
    localStorage.setItem('token', token);
  };

  handleLogout = () => {
    this.setState({ token: '' });
    localStorage.removeItem('token');
  };

  toggleLogin = () => {
    this.setState((prevState) => ({ showLogin: !prevState.showLogin }));
  };

  render() {
    const { token, showLogin } = this.state;

    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h1 className="bg-black text-white h-10 text-center font-semibold">EmoScribe</h1>
            <div className="flex">
              {token && <SideNavbar onLogout={this.handleLogout} />}
              <div className="flex-grow p-8">
                <Routes>
                  {!token ? (
                    <Route
                      path="/"
                      element={
                        <div className="flex flex-col items-center">
                          {showLogin ? (
                            <>
                              <Login onLogin={this.handleLogin} />
                              <div className="mt-4 text-center">
                                <p className="text-sm text-gray-600">
                                  Don't have an account?{' '}
                                  <span onClick={this.toggleLogin} className="text-blue-600 hover:underline cursor-pointer">
                                    Sign up
                                  </span>
                                </p>
                              </div>
                            </>
                          ) : (
                            <>
                              <Register onRegister={this.handleRegister} />
                              <div className="mt-4 text-center">
                                <p className="text-sm text-gray-600">
                                  Already have an account?{' '}
                                  <span onClick={this.toggleLogin} className="text-blue-600 hover:underline cursor-pointer">
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
                      <Route path="/profile" element={<Profile token={token} />} />
                      <Route path="/chart" element={<EntryChart token={token} />} /> {/* New Route for Chart */}
                    </>
                  )}
                </Routes>
              </div>
            </div>
          </header>
        </div>
      </Router>
    );
  }
}

export default App;
