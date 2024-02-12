import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div>Sidebar</div>
      <div>-----------------</div>
      <div className="sidebarSubSection">Profile</div>
      <div className="sidebarSubSection">Share</div>
      <div className="sidebarSubSection">Queue</div>
    </div>
  );
};

export default Sidebar;
