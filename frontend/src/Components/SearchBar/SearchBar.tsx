import React from "react";
import "./SearchBar.css";

interface SearchBarProps {
  handleChange: (value: string) => void;
  searchInput: string;
}

const SearchBar = ({ handleChange, searchInput }: SearchBarProps) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event.target.value);
  };

  return (
    <div className="search-bar">
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
