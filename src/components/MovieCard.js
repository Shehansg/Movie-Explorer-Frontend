import React from 'react';
import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/no-poster.png';

  return (
    <Link to={`/movie/${movie.id}`} className="block">
      <div className="rounded overflow-hidden shadow hover:shadow-lg transition">
        <img src={poster} alt={movie.title} className="w-full h-64 object-cover" />
        <div className="p-3 bg-white dark:bg-gray-900">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {movie.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {new Date(movie.release_date).getFullYear()} · ⭐ {movie.vote_average}
          </p>
        </div>
      </div>
    </Link>
  );
}
