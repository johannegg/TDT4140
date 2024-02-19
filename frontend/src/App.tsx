import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import GamePage from './Pages/GamePage/GamePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/game/:gameId" element={<GamePage />} />
    </Routes>
  );
}
export default App;