import React from "react";
import './MainArea.css';

const MainArea = ({ fontSize, fontColor }) => {
  return (
    <div className="main-area" style={{ fontSize: `${fontSize}px`, color: fontColor }}>
      <p>Szkielety programistyczne w aplikacjach internetowych: Node, MongoDB, Express, React.</p>
    </div>
  );
};

export default MainArea;