import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });
      this.props.onLogin(response.data.token);
    } catch (err) {
      this.setState({ error: err.response?.data?.msg || 'Login failed' });
    }
  };

  render() {
    const { email, password, error } = this.state;

    return (
      <div className="w-full max-w-md mx-auto mt-16 p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h2>
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
        <form onSubmit={this.handleLogin}>
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
              className="w-full px-4 py-2 bg-gray-800 text-white placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              className="w-full px-4 py-2 bg-gray-800 text-white placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 ease-in-out"
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
