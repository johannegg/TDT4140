import React from "react";
import "./Navbar.css";
import "./DarkNavbar.css";
import logoImage from "./icon/Icebreaker-4.png";
import loginn from "./icon/loginn.png";
import logout from "./icon/logout.png";
import { Link } from "react-router-dom";
import DarkModeToggle from "../ToggleButton/DarkModeToggle";
import { useDarkMode } from "../../Contexts/DarkModeContext";

import NotificationBoxButton from "../NotificationBox/NotificationBoxButton";
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
  const { isDarkMode } = useDarkMode();
  const isLoggedIn = localStorage.getItem("userInfo") !== null;
  return (
    <div className={`header ${isDarkMode ? "dark" : ""}`}>
      <div style={{ display: "flex", justifyContent: "right" }}>
        <div className={`adSpace ${isDarkMode ? "dark" : ""}`}>Annonsere her? Kontakt ice@breaker.no</div>
      </div>
      <div className="logo">
        <Link to={"/"}>
          <img
            style={{
              height: "90px",
              width: "400px",
              marginTop: "10px",
              cursor: "hand",
            }}
            alt="Logo"
            src={logoImage}
          />
        </Link>
      </div>
      <div className="controls">
        <div style={{ width: "50px", height: "100px", cursor: "pointer" }}>
          <NotificationBoxButton />
        </div>
        <div
          style={{
            width: "80px",
            height: "40px",
            marginTop: "30px",
            marginBottom: "30px",
            marginLeft: "10px",
            marginRight: "15px",
          }}
        >
          <DarkModeToggle />
        </div>
        <img
          style={{ height: "60px", cursor: "pointer" }}
          onClick={isLoggedIn ? handleLogout : props.toggleLoginModal}
          src={isLoggedIn ? logout : loginn}
          alt={isLoggedIn ? "Log out" : "Log in"}
        />
      </div>
    </div>
  );
};

export default Navbar;
