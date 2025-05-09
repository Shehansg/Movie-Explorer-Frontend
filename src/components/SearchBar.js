import React, { useState, useContext } from 'react';
import { MovieContext } from '../context/MovieContext';

export default function SearchBar({ onSearch }) {
  const { lastSearch, setLastSearch } = useContext(MovieContext);
  const [query, setQuery] = useState(lastSearch);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLastSearch(query);
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-6">
      <input
        type="text"
        className="flex-grow px-4 py-2 border rounded-l focus:outline-none"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
}
