import { Dispatch, SetStateAction, useState } from "react";
import CategoryBox from "../CategoryBox/CategoryBox";
import "./Sidebar.css";
import "./DarkSidebar.css";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import { useDarkMode } from "../../Contexts/DarkModeContext";

interface SidebarProps {
  toggleFormModal: () => void;
  
  handleChange: (value: string) => void;
  checkedCategories: Array<string>;
  setCheckedCategories: Dispatch<SetStateAction<string[]>>;
}


const Sidebar = (props: SidebarProps) => {
  
  const [searchInput, setSearchInput] = useState("");
  const isLoggedIn = localStorage.getItem("userInfo") !== null;
  const { isDarkMode } = useDarkMode();

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
    <div className={`sidebar ${isDarkMode ? "dark" : ""}`}>
      {isLoggedIn ? (
        <>
          <Link to="/profil" className="sidebarSubSection">Profil</Link>
          <div>-----------------</div>
          <div onClick={handleToggleFormModal} className="sidebarSubSection">+ Legg til nytt spill</div>
        </>
      ) : (
        <>
          <div onClick={() => alert("Du må være logget inn for å se profilen")} className="sidebarSubSection">Profil</div>
          <div>-----------------</div>
          <div onClick={() => alert("Du må være logget inn for å legge til spill")} className="sidebarSubSection">+ Legg til nytt spill</div>
        </>
      )}
      <div>-----------------</div>
      <SearchBar handleChange={handleChange} searchInput={searchInput} />
      <CategoryBox
        checkedCategories={props.checkedCategories}
        setCheckedCategories={props.setCheckedCategories}
      ></CategoryBox>
    </div>
  );
};

export default Sidebar;
