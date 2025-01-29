import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import './Login.css';

const LoginRegister = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false); 
  const [error, setError] = useState('');


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');

  const fixedAccount = {
    email: 'a@com',
    password: 'a',
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email !== fixedAccount.email) {
      setError('Email does not exist.');
    } else if (password !== fixedAccount.password) {
      setError('Incorrect password.');
    } else {
      login(email);
      setError('');
      navigate('/');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const user = { email, password, name, surname, phone, mobile, address };

    fetch("http://localhost:8080/api/users", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then(response => response.json())
      .then(() => {
        setIsRegistering(false);
        setError('');
      })
      .catch(error => setError('Registration failed.'));
  };

  const handlePhoneChange = (e) => /^\d*$/.test(e.target.value) && setPhone(e.target.value);
  const handleMobileChange = (e) => /^\d*$/.test(e.target.value) && setMobile(e.target.value);

  return (
    <div className="container">
      <h1 className="title">{isRegistering ? 'Register' : 'Login'}</h1>
      {error && <p className="error-message">{error}</p>}
      
      <form onSubmit={isRegistering ? handleRegister : handleLogin} className="form">
        <div className="form-group">
          <label className="label">Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" required />
        </div>

        <div className="form-group">
          <label className="label">Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" required />
        </div>

        {isRegistering && (
          <>
            <div className="form-group">
              <label className="label">Confirm Password:</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="input" required />
            </div>
            <div className="form-group">
              <label className="label">Name:</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input" required />
            </div>
            <div className="form-group">
              <label className="label">Surname:</label>
              <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} className="input" required />
            </div>
            <div className="form-group">
              <label className="label">Phone:</label>
              <input type="tel" value={phone} onChange={handlePhoneChange} className="input" pattern="[0-9]*" required />
            </div>
            <div className="form-group">
              <label className="label">Mobile:</label>
              <input type="tel" value={mobile} onChange={handleMobileChange} className="input" pattern="[0-9]*" required />
            </div>
            <div className="form-group">
              <label className="label">Address:</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="input" required />
            </div>
          </>
        )}

        <button type="submit" className="button">{isRegistering ? 'Register' : 'Login'}</button>
      </form>

      <div className="toggle-link">
        <p className="switch-text">
          {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
          <button onClick={() => setIsRegistering(!isRegistering)} className="switch-button">
            {isRegistering ? 'Login here' : 'Register here'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginRegister;

