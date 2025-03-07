import React from 'react';
import './Card.css';

function Card({ name, image, dates, profession, country }) {
  return (
    <div className="Card">
      <h2>{name}</h2>
      <img src={image} alt={name} />
      <p>{dates}</p>
      <p>{profession}</p>
      <p>{country}</p>
    </div>
  );
}

export default Card;
