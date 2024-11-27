import React from 'react';

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to the Home Page!</h1>
      <p style={styles.text}>
        Explore our collection of books and find your next favorite read.
      </p>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#f0f8ff',
    color: '#333',
    height: '100vh',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '10px',
  },
  text: {
    fontSize: '1.2rem',
  },
};

export default Home;

