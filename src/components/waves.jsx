import React, { useState, useEffect } from "react";
import './waves.css';

export const Waves = () => {
  const [votes, setVotes] = useState({ matias: 0, geovanna: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/get_votes_data");
        const result = await response.json();

        const matiasVotes = result.find(item => item.nombre_lista === "Lista #1")?.votos || 0;
        const geovannaVotes = result.find(item => item.nombre_lista === "Lista 2")?.votos || 0;

        setVotes({ matias: matiasVotes, geovanna: geovannaVotes });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data initially and then every 5 seconds
    fetchData();
    const interval = setInterval(fetchData, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const totalVotes = votes.matias + votes.geovanna;
  const matiasPercentage = totalVotes > 0 ? (votes.matias / totalVotes) * 100 : 50;
  const geovannaPercentage = 100 - matiasPercentage;

  return (
    <div className="waves-container">
      <div className="candidate matias" style={{ width: `${matiasPercentage}%` }}>
        <h2>Lester Matías Ibarra Lucas</h2>
      </div>
      <div className="candidate geovanna" style={{ width: `${geovannaPercentage}%` }}>
        <h2>Geovanna Haro</h2>
      </div>
    </div>
  );
};
