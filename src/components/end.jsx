import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './end.css'; // Asegúrate de crear y estilizar este archivo CSS

const End = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 6000);

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="end-container">
      <h1>¡Muchas gracias por votar!</h1>
    </div>
  );
};

export default End;
