import React from "react";
import "./Navbar.css"

import navbarIcon from "./icon/navbar.png"; // Path to your navbar icon
import logoImage from "./icon/Icebreaker-4.png"; // Path to your other image

const Navbar = () => {
  return (
    <div className="header">
      {/* Add inline style for margin-top to the navbar icon */}
      <img src={navbarIcon} height="60" width="45" alt="Navbar Icon" style={{ marginTop: '8px' }} />
      <img src={logoImage} height="100" width="400" alt="Logo" />
    </div>
  );
};

export default Navbar;

