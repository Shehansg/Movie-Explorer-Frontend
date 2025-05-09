import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
  fetchMovieDetails,
  getFavorites,
  addFavorite,
  removeFavorite
} from '../utils/api';
import { MovieContext } from '../context/MovieContext';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const { favorites, addFavorite: ctxAdd, removeFavorite: ctxRem } = useContext(MovieContext);

  useEffect(() => {
    fetchMovieDetails(id).then(setMovie);
    getFavorites().then((favs) => {
      // initialize if needed
    });
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  const isFav = favorites.some((m) => m.id === movie.id);

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full rounded shadow"
      />
      <div className="md:col-span-2 space-y-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {movie.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          {movie.release_date} · ⭐ {movie.vote_average}
        </p>
        <div className="flex flex-wrap gap-2">
          {movie.genres.map((g) => (
            <span
              key={g.id}
              className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm"
            >
              {g.name}
            </span>
          ))}
        </div>
        <p className="text-gray-800 dark:text-gray-200">{movie.overview}</p>
        {movie.videos.results.length > 0 && (
          <a
            href={`https://www.youtube.com/watch?v=${movie.videos.results[0].key}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Watch Trailer
          </a>
        )}
        <button
          onClick={() =>
            isFav
              ? ctxRem(movie.id)
              : ctxAdd({
                  id: movie.id,
                  title: movie.title,
                  poster_path: movie.poster_path,
                  release_date: movie.release_date,
                  vote_average: movie.vote_average
                })
          }
          className={`px-4 py-2 rounded ${
            isFav
              ? 'bg-yellow-500 text-gray-900'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isFav ? 'Remove Favorite' : 'Add to Favorites'}
        </button>
      </div>
    </div>
  );
}
