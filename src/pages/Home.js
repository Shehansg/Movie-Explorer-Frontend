import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import { fetchTrending, searchMovies } from '../utils/api';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import MovieGrid from '../components/MovieGrid';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [mode, setMode] = useState('trending');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loadMore = useCallback(() => hasMore && setPage((p) => p + 1), [hasMore]);
  const setSentinel = useInfiniteScroll(loadMore);

  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
  }, [mode, query]);

  useEffect(() => {
    if (mode === 'trending') {
      fetchTrending().then((data) => setMovies(data));
    } else {
      searchMovies(query, page).then((res) => {
        setMovies((prev) => [...prev, ...res.results]);
        setHasMore(page < res.total_pages);
      });
    }
  }, [mode, query, page]);

  const handleSearch = (q) => {
    setQuery(q);
    setMode('search');
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {mode === 'trending' && (
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          Trending This Week
        </h2>
      )}
      <MovieGrid movies={movies} />
      {mode === 'search' && hasMore && <div ref={setSentinel} className="h-1" />}
      {mode === 'search' && !hasMore && (
        <button
          onClick={loadMore}
          className="w-full py-2 mt-4 bg-gray-200 dark:bg-gray-700 rounded"
        >
          Load More
        </button>
      )}
    </>
  );
}
// 