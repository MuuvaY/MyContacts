import { useState } from "react";
import "../../css/Contacts/searchBar.css";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="searchbar">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Rechercher un contact (nom, email, téléphone...)"
        className="searchbar-input"
      />

      {query && (
        <button onClick={handleClear} className="searchbar-clear">
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;
