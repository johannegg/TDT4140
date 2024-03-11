import React, { useState, useEffect } from "react";
import "./Timer.css";

const Timer: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    if (isRunning) {
      intervalId = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setElapsedTime(0);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formatMinutes = String(minutes).padStart(2, "0");
    const formatSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formatMinutes}:${formatSeconds}`;
  };

  return (
    <div className="timer">
      <p className="titlee">Ta tiden på leken!</p>
      <p className="format">{formatTime(elapsedTime)}</p>
      <button className="startButton" onClick={startTimer}>
        Start
      </button>
      <button className="stopButton" onClick={stopTimer}>
        Stop
      </button>
      <button className="resetButton" onClick={resetTimer}>
        Reset
      </button>
    </div>
  );
};

export default Timer;
