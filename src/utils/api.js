import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});
API.interceptors.request.use((cfg) => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

// Auth
export const registerUser = (username, password) =>
  API.post('/auth/register', { username, password });
export const loginUser = (username, password) =>
  API.post('/auth/login', { username, password });

// Movies
export const fetchTrending = () =>
  API.get('/movies/trending').then((r) => r.data);
export const searchMovies = (query, page) =>
  API.get('/movies/search', { params: { query, page } }).then((r) => r.data);
export const fetchMovieDetails = (id) =>
  API.get(`/movies/${id}`).then((r) => r.data);

// Favorites
export const getFavorites = () =>
  API.get('/movies/favorites').then((r) => r.data);
export const addFavorite = (movie) =>
  API.post('/movies/favorites', movie).then((r) => r.data);
export const removeFavorite = (id) =>
  API.delete(`/movies/favorites/${id}`).then((r) => r.data);
