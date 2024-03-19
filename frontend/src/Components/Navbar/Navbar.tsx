import React from 'react';
import "./Navbar.css";
import "./DarkNavbar.css";
import logoImage from "./icon/Icebreaker-4.png";
import loginn from "./icon/loginn.png";
import logout from "./icon/logout.png";
import { Link } from "react-router-dom";
import DarkModeToggle from '../ToggleButton/DarkModeToggle';
import { useDarkMode } from '../../Contexts/DarkModeContext';

interface NavbarProps {
  toggleLoginModal: () => void;
}

const handleLogout = () => {
  if (window.confirm("Er du sikker på at du vil logge ut?")) {
    localStorage.clear();
    window.location.href = "/";
  }
};

const Navbar: React.FC<NavbarProps> = (props) => {
  const {isDarkMode} = useDarkMode();
  return (
    <div className={`header ${isDarkMode ? "dark" : ""}`}>
      <div className="adSpace">
        Annonsere her? Kontakt ice@breaker.no
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Link to={"/"}>
          <img src={logoImage} height="100" width="400" alt="Logo" />
        </Link>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: 'center' }}>
        <div style={{ marginRight: '16px' }}> 
          <DarkModeToggle />
        </div>
        {localStorage.getItem("userInfo") == null && (
          <img
            className="logImg"
            onClick={props.toggleLoginModal}
            src={loginn}
            height="60"
            alt="Log in"
            style={{ marginTop: "16px", cursor: "pointer" }}
          />
        )}
        {localStorage.getItem("userInfo") !== null && (
          <img
            className="logImg"
            onClick={handleLogout}
            src={logout}
            height="60"
            alt="Log out"
            style={{ marginTop: "16px", cursor: "pointer" }}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
