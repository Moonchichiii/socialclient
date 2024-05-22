import React, { useEffect, useState } from "react";

const DinnerCard = () => {
  const [dinners, setDinners] = useState([]);

  useEffect(() => {
    fetch("/api/dinner-club/")
      .then(response => response.json())
      .then(data => setDinners(data))
      .catch(error => console.error("Error fetching dinner events:", error));
  }, []);

  return (
    <div className="feature-cards">
      {dinners.length > 0 ? (
        dinners.map(dinner => (
          <div className="feature-card" key={dinner.id}>
            <h3>{dinner.title}</h3>
            <p>Date: {new Date(dinner.date_time).toLocaleDateString()}</p>
            <p>Time: {new Date(dinner.date_time).toLocaleTimeString()}</p>
            <p>Location: {dinner.location}</p>
          </div>
        ))
      ) : (
        <p>No upcoming dinners</p>
      )}
    </div>
  );
};

export default DinnerCard;
