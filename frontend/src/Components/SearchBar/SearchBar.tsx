import React from "react";
import "./SearchBar.css";
import "./DarkSearchBar.css";
import { useDarkMode } from "../../Contexts/DarkModeContext";


interface SearchBarProps {
  handleChange: (value: string) => void;
  searchInput: string;
}

const SearchBar = ({ handleChange, searchInput }: SearchBarProps) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event.target.value);
  };

const { isDarkMode } = useDarkMode();

  return (
    <div className={`searchbar ${isDarkMode ? "dark" : ""}`}>
      <input
        className="search-input"
        type="search"
        placeholder="Søk her..."
        value={searchInput}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
