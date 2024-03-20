import React, { useState } from "react";
import "./Wheel.css";
import { Link } from "react-router-dom";

interface WheelProps {
  idsAndTitles: Map<string, string>;
  gameTitles: string[];
}

const Wheel: React.FC<WheelProps> = ({ idsAndTitles, gameTitles }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const [show, setShow] = useState<boolean>(false);

  const segmentSize = 360 / gameTitles.length;

  const spinWheel = () => {
    setSpinning(true);
    const newRotation = rotation + 360 * 5 + Math.floor(Math.random() * 360);
    setRotation(newRotation);
    setTimeout(() => {
      const randomIndex = Math.floor((360 - (newRotation % 360)) / segmentSize);
      setSelectedItem(gameTitles[randomIndex]);
      setSpinning(false);
      setShow(true);
    }, 1000);
  };

  const handleClick = () => {
    if (!spinning) {
      spinWheel();
    }
  };

  const resultStyle: React.CSSProperties = show && selectedItem ? { backgroundColor: "white", padding: "10px"} : {};

  return (
    <div className="wheel" onClick={handleClick}>
      <div className="spinner">
        {gameTitles.map((title, index) => {
          const segmentStyle: React.CSSProperties = {
            backgroundColor: `hsl(${
              (360 * index) / gameTitles.length
            }, 80%, 80%)`,
            transform: `rotate(${rotation + index * segmentSize}deg)`,
          };
          return (
            <div key={index} className="wheelSegment" style={segmentStyle}>
                <span className="gameName">{title}</span>
            </div>
          );
        })}
        <div className="pointer" />
      </div>
      <Link
        to={selectedItem ? `/spill/${idsAndTitles.get(selectedItem)}` : '#'}
        style={{ textDecoration: "none" }}
      >
        <div className="result" style={resultStyle}>{selectedItem}</div>
      </Link>
    </div>
  );
};

export default Wheel;
