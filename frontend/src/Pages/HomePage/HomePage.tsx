import React from "react";
import "./HomePage.css";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import ListView from "../../Components/ListView/ListView";

export default function HomePage() {
  return (
    <>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <ListView></ListView>
    </>
  );
}


