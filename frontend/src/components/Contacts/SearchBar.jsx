import { useState } from "react";

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
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="🔍 Rechercher un contact (nom, email, téléphone...)"
        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <span className="absolute left-4 top-3.5 text-gray-400 text-xl">🔍</span>
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-4 top-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;
