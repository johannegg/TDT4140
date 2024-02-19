import { Dispatch, SetStateAction, useState } from "react";
import CategoryBox from "../CategoryBox/CategoryBox";
import "./Sidebar.css";

interface SidebarProps {
  toggleFormModal: () => void;
  /* filterCategories: Dispatch<SetStateAction<boolean[]>>; */
}


const Sidebar = (props: SidebarProps) => {
  const handleToggleFormModal = () => {
    if (localStorage.getItem("userInfo") === null) {
      alert("Du må være logget inn for å legge til spill");
      return;
    }
    props.toggleFormModal();
  };

  return (
    <div className="sidebar">
      <div className="sidebarSubSection">Profil</div>
      <div className="sidebarSubSection">Del</div>
      <div className="sidebarSubSection">Kø</div>
      <div>-----------------</div>
      <div className="sidebarSubSection" onClick={handleToggleFormModal}>
        + Legg til nytt spill
      </div>
      <div>-----------------</div>
      <CategoryBox /* filterCategories={props.filterCategories} */></CategoryBox>
    </div>
  );
};

export default Sidebar;
