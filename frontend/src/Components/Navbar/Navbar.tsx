import React from "react";
import "./Navbar.css"

import navbarIcon from "./icon/navbar.png"; // Path to your navbar icon
import logoImage from "./icon/Icebreaker-4.png"; // Path to your other image
import loginn from "./icon/loginn.png"; // Path to your other image

const Navbar = () => {
  return (
    <div className="header">
      {/* Add inline style for margin-top to the navbar icon */}
      <div >
      <img src={navbarIcon} height="70" width="45" alt="Navbar Icon" style={{ marginTop: '8px', marginLeft: '32px' }} />
      </div>
      <div >
      <img src={logoImage} height="100" width="400" alt="Logo" />
      </div>
      <div style={{display: 'flex', justifyContent: 'flex-end'}} >
      <img src={loginn} height = "60" alt="Logo" style={{ marginTop: '16px'}}/>
      </div>
      
    </div>
    
    
  );
};

export default Navbar;

