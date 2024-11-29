import React, { useState } from 'react';
import './checkout.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSn] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [shipToDifferent, setShipToDifferent] = useState(false);
  const [altAddress, setAltAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      name,
      surname,
      phone,
      address: shipToDifferent ? altAddress : address,
      mobile,
    };

    fetch("http://localhost:8080/api/users", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPhone(value);
    }
  };

  const handleMobileChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setMobile(value);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Checkout</h1>
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
        
        <div className="form-group-row">
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
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="label">Phone:</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={handlePhoneChange}
            className="input"
            pattern="[0-9]*"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="mobile" className="label">Mobile:</label>
          <input
            type="tel"
            id="mobile"
            value={mobile}
            onChange={handleMobileChange}
            className="input"
            pattern="[0-9]*"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address" className="label">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="input"
            required
          />
        </div>

        <div className="form-group">
          <label className="label">
            <input
              type="checkbox"
              checked={shipToDifferent}
              onChange={(e) => setShipToDifferent(e.target.checked)}
            />
            Ship to a different address
          </label>
        </div>

        {shipToDifferent && (
          <div className="form-group">
            <label htmlFor="altAddress" className="label">Alternative Address:</label>
            <input
              type="text"
              id="altAddress"
              value={altAddress}
              onChange={(e) => setAltAddress(e.target.value)}
              className="input"
              required
            />
          </div>
        )}

        <button type="submit" className="button">Submit</button>
      </form>
    </div>
  );
};

export default Register;

