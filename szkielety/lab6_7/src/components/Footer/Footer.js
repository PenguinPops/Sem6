import React from "react";
import './Footer.css';

const Footer = ({ onSetFooterParams, onLike }) => {
  return (
    <footer className="footer">
      <p>
        Stopka <button onClick={onSetFooterParams}>Ustaw parametry tekstu na 30px, a kolor pozostaw bez zmian.</button>
      </p>
      <p>
        <button onClick={onLike}>Polub tę stronę!</button>
      </p>
    </footer>
  );
};

export default Footer;