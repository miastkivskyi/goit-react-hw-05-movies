import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchFilm } from '../../shared/api';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loader from '../../components/loader/loader';
import MoviesGallary from '../../components/moviesGallery/moviesGallery';
import MovieSearch from 'components/movieSearch/movieSearch';

import css from '../Movies/Movies.module.css';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  let query = searchParams.get('query') ?? '';
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!query) {
      return;
    }
    async function fetchToSearch() {
      try {
        setIsLoading(true);
        const r = await searchFilm(query);

        if (r.length > 0) {
          return setMovies(r);
        } else {
          setMovies([]);
          return toast.error(
            'Sorry, there are no movies matching your search query.'
          );
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchToSearch();
  }, [query]);

  const updateQueryString = value => {
    setSearchParams({ query: `${value}` });
  };

  return (
    <div>
      <div className={css.formContainer}>
        <MovieSearch query={query} onSearch={updateQueryString} />
        <main>
          {isLoading && <Loader />}
          {error && <h2>{error}</h2>}
          {movies.length !== 0 && <MoviesGallary movies={movies} />}
        </main>
        <ToastContainer
          position="top-center"
          autoClose={2500}
          theme="colored"
        />
      </div>
    </div>
  );
};

export default Movies;
