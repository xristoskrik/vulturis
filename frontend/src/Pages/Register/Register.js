import React, { useState } from 'react';
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSn] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      return;
    }

  };

  return (
    <div className="container">
      <h1 className="title">Register</h1>
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
        <div className="form-group">
          <label htmlFor="confirmPassword" className="label">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input"
            required
          />
        </div>
         <div className="form-group">
          <label htmlFor="name" className="label">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            required
          />
        </div>
            <div className="form-group">
          <label htmlFor="surname" className="label">Surname:</label>
          <input
            type="text"
            id="surname"
            value={surname}
            onChange={(e) => setSn(e.target.value)}
            className="input"
            required
          />
        </div>
        
          <div className="form-group">
          <label htmlFor="surname" className="label">Phone:</label>
          <input
            type="number"
            id="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input"
            required
          />
        </div>
        
          <div className="form-group">
          <label htmlFor="Mobile" className="label">Mobile:</label>
          <input
            type="number"
            id="Mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="input"
            required
          />
        </div>
        
        
          <div className="form-group">
          <label htmlFor="Address" className="label">Address:</label>
          <input
            type="text"
            id="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="input"
            required
          />
        </div>
        
        
        
        <button type="submit" className="button">Register</button>
      </form>
    </div>
  );
};

export default Register;

