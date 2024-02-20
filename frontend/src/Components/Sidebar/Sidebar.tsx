import { Dispatch, SetStateAction, useState } from "react";
import CategoryBox from "../CategoryBox/CategoryBox";
import "./Sidebar.css";
import SearchBar from "../SearchBar/SearchBar";

interface SidebarProps {
  toggleFormModal: () => void;
  handleChange: (value: string) => void;
  checkedCategories: Array<string>;
  setCheckedCategories: Dispatch<SetStateAction<string[]>>;
}

const Sidebar = (props: SidebarProps) => {
  const [searchInput, setSearchInput] = useState("");

  const handleToggleFormModal = () => {
    if (localStorage.getItem("userInfo") === null) {
      alert("Du må være logget inn for å legge til spill");
      return;
    }
    props.toggleFormModal();
  };

  const handleChange = (value: string) => {
    setSearchInput(value);
    props.handleChange(value);
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
      <SearchBar handleChange={handleChange} searchInput={searchInput} />
      <div>-----------------</div>
      <CategoryBox
        checkedCategories={props.checkedCategories}
        setCheckedCategories={props.setCheckedCategories}
      ></CategoryBox>
    </div>
  );
};

export default Sidebar;
