import React from "react";
import './Sidebar.css';

const Sidebar = ({ fontSize, fontColor, onFontSizeChange, onFontColorChange, onSetTextParams }) => {
  return (
    <div className="sidebar">
      <input type="number" value={fontSize} onChange={onFontSizeChange} />
      <input type="text" value={fontColor} onChange={onFontColorChange} />
      <button onClick={onSetTextParams}>Ustaw parametry tekstu na 20px i pink.</button>
    </div>
  );
};

export default Sidebar;