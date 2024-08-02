import React, { useState, useEffect } from "react";
import './Users.css';
import axios from 'axios';

// Importa las imágenes
import tortu from './images/tortu.jpg';
import mathias from './images/mathias.jpg';
import spider from './images/spider.png';
import geo from './images/geo.jpg';

export const Users = () => {
  const [candidates, setCandidates] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/get_all_candidates");
        setCandidates(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleVote = async (nombre_lista) => {
    try {
      const response = await axios.post(`/vote/${encodeURIComponent(nombre_lista)}`);

      if (response.status === 200) {
        setShowMessage(true);
        setSelectedCandidate(nombre_lista);

        // Redirigir después de 3 segundos
        setTimeout(() => {
          setShowMessage(false);
          setSelectedCandidate(null);
          // Redirigir usando window.location.replace
          window.location.replace("/thanks"); // Cambia "/thanks" a la ruta correcta si es necesario
        }, 3000);
      }
    } catch (error) {
      console.error("Error submitting vote:", error);
    }
  };

  return (
    <div className="users-container">
      <div className="candidate-cards-container">
        {candidates.map((candidate, index) => (
          <div
            className={`candidate-card ${selectedCandidate === candidate.nombre_lista ? "grow" : ""}`}
            key={index}
            onClick={() => handleVote(candidate.nombre_lista)}
            onMouseEnter={() => setSelectedCandidate(candidate.nombre_lista)}
            onMouseLeave={() => setSelectedCandidate(null)}
          >
            {candidate.nombre_lista === "Lista #1" && <img src={mathias} alt={candidate.nombre_representante} />}
            {candidate.nombre_lista === "Lista #2" && <img src={geo} alt={candidate.nombre_representante} />}
            <h2>{candidate.nombre_representante}</h2>
            <p>Equipo: {candidate.nombre_lista}</p>
          </div>
        ))}
      </div>
      {showMessage && (
        <div className="vote-message-overlay">
          <p className="vote-message">
            ¡Voto registrado para el equipo {selectedCandidate}! Gracias por tu participación.
          </p>
        </div>
      )}
    </div>
  );
};
