import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router for navigation

const Delivery = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  };

  const textStyle = {
    fontSize: '4.5rem',
    marginBottom: '20px',
    textAlign:'center',
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '3rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
  };

  return (
    <div style={containerStyle}>
      <p style={textStyle}> Thank you for choosing our delivery service! Your order has been successfully submitted.
        It will be delivered to you within 7 days.</p>

      <Link to="/" style={buttonStyle}>
        Back to Home
      </Link>
    </div>
  );
}

export default Delivery;
