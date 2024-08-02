import React from "react";
import { Link } from "react-router-dom";
import './nav.css'; // Importa los estilos CSS

export const Nav = () => (
  <div className="nav-container">
    <div className="nav-content">
      <h1>Elecciones Consejo Estudiantil 2024 - 2025</h1>
      <h2>Unidad Educativa Jesús María</h2>
      <Link to="/Users">
        <button className="nav-button">HAZ CLICK PARA VOTAR</button>
      </Link>
    </div>
  </div>
);
