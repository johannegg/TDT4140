import React from "react";
import "./Navbar.css";

import navbarIcon from "./icon/navbar.png";
import logoImage from "./icon/Icebreaker-4.png";
import loginn from "./icon/loginn.png";
import logout from "./icon/logout.png";
interface NavbarProps {
  toggleLoginModal: () => void;
}
const handleLogout = () => {
  if (window.confirm("Are you sure you want to logout?")) {
    localStorage.clear();
    window.location.reload();
  }
};
const Navbar = (props: NavbarProps) => {
  return (
    <div className="header">
      <div>
        {/* <img
          src={navbarIcon}
          height="70"
          width="45"
          alt="Navbar Icon"
          style={{ marginTop: "8px", marginLeft: "32px" }}
        /> */}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src={logoImage} height="100" width="400" alt="Logo" />
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {localStorage.getItem("userInfo") == null && (
          <img
            onClick={props.toggleLoginModal}
            src={loginn}
            height="60"
            alt="Logo"
            style={{ marginTop: "16px", cursor: "pointer" }}
          />
        )}
        {localStorage.getItem("userInfo") !== null && (
          <img
            onClick={handleLogout}
            src={logout}
            height="60"
            alt="Logo"
            style={{ marginTop: "16px", cursor: "pointer" }}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
