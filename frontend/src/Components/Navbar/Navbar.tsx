import React from "react";
import "./Navbar.css"

const Navbar = () => {
  return (
    <>
      <div className="header">
        <img src={require("./icon/android-chrome-192x192.png")} width={60} alt="test" />
        <p>Icebreaker</p>
      </div>
    </>
  );
};

export default Navbar;
