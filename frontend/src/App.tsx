import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import GamePage from './Pages/GamePage/GamePage';
import UserPage from './Pages/UserPage/UserPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/spill/:gameId" element={<GamePage />} />
      <Route path="/profil" element={<UserPage />} />
    </Routes>
  );
}
export default App;