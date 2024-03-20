import { Route, Routes } from "react-router-dom";
import { DarkModeProvider } from "./Contexts/DarkModeContext";
import HomePage from "./Pages/HomePage/HomePage";
import GamePage from "./Pages/GamePage/GamePage";
import UserPage from "./Pages/UserPage/UserPage";
import ReportPage from "./Pages/ReportPage/ReportPage";

function App() {
  return (
    <DarkModeProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/spill/:gameId" element={<GamePage />} />
        <Route path="/profil" element={<UserPage />} />
        <Route path="/rapport" element={<ReportPage />}></Route>
      </Routes>
    </DarkModeProvider>
  );
}

export default App;
