import React from "react";
import './Header.css';

const Header = ({ fontSize, fontColor, likes }) => {
  return (
    <div className="header">
      <h1>Nagłówek</h1>
      <p>Aktualny rozmiar czcionki: <strong>{fontSize}px</strong></p>
      <p>Aktualny kolor czcionki: <strong>{fontColor}</strong></p>
      <p>Liczba lajków: <strong>{likes}</strong></p>
    </div>
  );
};

export default Header;