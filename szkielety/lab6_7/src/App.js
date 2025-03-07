import './App.css';
import React, { useState } from "react";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import MainArea from "./components/MainArea/MainArea";
import Footer from "./components/Footer/Footer";

function App() {
  const [fontSize, setFontSize] = useState(18);
  const [fontColor, setFontColor] = useState("green");
  const [likes, setLikes] = useState(0);

  const handleFontSizeChange = (event) => {
    setFontSize(Number(event.target.value));
  };

  const handleFontColorChange = (event) => {
    setFontColor(event.target.value);
  };

  const handleSetTextParams = () => {
    setFontSize(20);
    setFontColor("pink");
  };

  const handleSetFooterParams = () => {
    setFontSize(30);
  };

  const handleLike = () => {
    setLikes(likes + 1);
  };

  return (
    <div className="grid-parent">
      <Header fontSize={fontSize} fontColor={fontColor} likes={likes} />
      <Sidebar
        fontSize={fontSize}
        fontColor={fontColor}
        onFontSizeChange={handleFontSizeChange}
        onFontColorChange={handleFontColorChange}
        onSetTextParams={handleSetTextParams}
      />
      <MainArea fontSize={fontSize} fontColor={fontColor} />
      <Footer onSetFooterParams={handleSetFooterParams} onLike={handleLike} />
    </div>
  );
}

export default App;