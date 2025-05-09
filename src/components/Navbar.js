import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';
import { SunIcon, MoonIcon } from '@heroicons/react/solid';

export default function Navbar() {
  const { dark, toggleDark, user, logout } = useContext(MovieContext);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
          Movie Explorer
        </Link>
        <div className="flex items-center space-x-4">
          <button onClick={toggleDark} className="p-2 rounded">
            {dark ? (
              <SunIcon className="h-6 w-6 text-yellow-400" />
            ) : (
              <MoonIcon className="h-6 w-6 text-gray-900" />
            )}
          </button>
          {user && (
            <button
              onClick={logout}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
