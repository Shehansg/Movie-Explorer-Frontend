import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import { MovieContext } from './context/MovieContext';

export default function App() {
  const { user } = useContext(MovieContext);

  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mx-auto px-4 mt-6">
        <Routes>
          <Route path="/login" element={<Login />} />
          {user ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}
