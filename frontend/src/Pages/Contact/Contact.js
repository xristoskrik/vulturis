import React from 'react';

const Contact = () => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <iframe
        title="Hasan Cafe Bar Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3144.6916960371946!2d23.733993299999998!3d37.9843237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a1bd372e186c33%3A0xa29ab040c08d4aa5!2zSGFzYW4gQ2FmZSBCYXIgKM6kzr_PhSDOp86xz4POrM69KQ!5e0!3m2!1sel!2sgr!4v1732891267001!5m2!1sel!2sgr"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Contact;

