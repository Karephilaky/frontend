import React, { useState, useEffect } from "react";
import './User.css';

// Importa las imágenes
import marioImage from './imagese/marioe.jpg';
import minecraftImage from './imagese/minecrafte.jpg';
import pacmanImage from './imagese/pacmane.jpg';
import pokemonImage from './imagese/pokemone.jpg';

export const User = () => {
  const [candidates, setCandidates] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/get");
        const data = await response.json();
        setCandidates(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleVote = async (equipo) => {
    try {
      const response = await fetch(`http://localhost:5000/votaciones/${equipo}`, {
        method: "POST",
      });

      if (response.ok) {
        setShowMessage(true);
        setSelectedCandidate(equipo);

        // Redirigir después de 3 segundos
        setTimeout(() => {
          setShowMessage(false);
          setSelectedCandidate(null);
          // Redirigir usando window.location.replace
          window.location.replace("/"); // Cambia "/user" a la ruta correcta
        }, 10000);
      }
    } catch (error) {
      console.error("Error submitting vote:", error);
    }
  };

  return (
    <div className="users-container">
      {candidates.map((candidate, index) => (
        <div
          className={`candidate-card ${selectedCandidate === candidate.equipo ? "grow" : ""}`}
          key={index}
          onClick={() => handleVote(candidate.equipo)}
          onMouseEnter={() => setSelectedCandidate(candidate.equipo)}
          onMouseLeave={() => setSelectedCandidate(null)}
        >
          {/* Utiliza las imágenes importadas */}
          {candidate.equipo === "Mario Bros" && <img src={marioImage} alt={candidate.name} />}
          {candidate.equipo === "Minecraft" && <img src={minecraftImage} alt={candidate.name} />}
          {candidate.equipo === "Pacman" && <img src={pacmanImage} alt={candidate.name} />}
          {candidate.equipo === "Pokemon" && <img src={pokemonImage} alt={candidate.name} />}
          <h2>{candidate.name}</h2>
          <p>Equipo: {candidate.equipo}</p>
        </div>
      ))}
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
