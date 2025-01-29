import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import './Login.css';

const Login = () => {
  const { login } = useAuth(); // Access the login function from AuthContext
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fixedAccount = {
    email: 'a@com',
    password: 'a',
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email !== fixedAccount.email) {
      setError('Email does not exist.');
    } else if (password !== fixedAccount.password) {
      setError('Incorrect password.');
    } else {
      login(email); // Update login state in AuthContext
      setError('');
      navigate('/'); // Redirect to home page after login
    }
  };

  return (
    <div className="container">
      <h1 className="title">Login</h1>
      {error && <p className="error-message" style={{ color: 'red', margin: '10px 0' }}>{error}</p>}
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="email" className="label">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="label">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            required
          />
        </div>
        <button type="submit" className="button">Login</button>
      </form>
      <div className="register-link">
        <p className="register-text">Don't have an account? <Link to="/register">Register here</Link></p>
</div>
    </div>
  );
};

export default Login;

