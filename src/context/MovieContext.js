import React, { createContext, useState, useEffect } from 'react';

export const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [dark, setDark] = useState(
    localStorage.getItem('theme') === 'dark'
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );
  const [lastSearch, setLastSearch] = useState(
    localStorage.getItem('lastSearch') || ''
  );

  // apply dark mode class
  useEffect(() => {
    const root = window.document.documentElement;
    if (dark) root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => localStorage.setItem('user', JSON.stringify(user)), [user]);
  useEffect(() => localStorage.setItem('favorites', JSON.stringify(favorites)), [favorites]);
  useEffect(() => localStorage.setItem('lastSearch', lastSearch), [lastSearch]);

  const toggleDark = () => setDark((d) => !d);
  const login = (username, token) => {
    setUser({ username });
    localStorage.setItem('token', token);
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };
  const addFavorite = (movie) =>
    setFavorites((favs) =>
      favs.some((m) => m.id === movie.id) ? favs : [...favs, movie]
    );
  const removeFavorite = (id) =>
    setFavorites((favs) => favs.filter((m) => m.id !== id));

  return (
    <MovieContext.Provider
      value={{
        dark,
        toggleDark,
        user,
        login,
        logout,
        favorites,
        addFavorite,
        removeFavorite,
        lastSearch,
        setLastSearch
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}
