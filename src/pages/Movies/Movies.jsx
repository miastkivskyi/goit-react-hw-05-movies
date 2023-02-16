import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchFilm } from '../../shared/api';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loader from '../../components/loader/loader';
import MoviesGallary from '../../components/moviesGallery/moviesGallery';

import { ImSearch } from 'react-icons/im';
import css from '../Movies/Movies.module.css';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  let query = searchParams.get('query') ?? '';
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function fetchToSearch() {
    try {
      setIsLoading(true);
      const r = await searchFilm(query);

      if (r.length > 0) {
        return setMovies(r);
      } else {
        setMovies([]);
        return toast.error(
          'Sorry, there are no images matching your search query.'
        );
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      toast.error('Please enter some world');
      return;
    }
    fetchToSearch();
    query = '';
  };
  const updateQueryString = query => {
    const nextParams = query !== '' ? { query } : {};
    setSearchParams(nextParams);
  };

  return (
    <div>
      {isLoading && <Loader />}
      <div className={css.formContainer}>
        <form className={css.form} onSubmit={handleSubmit}>
          <button type="submit" className={css.searchFormButton}>
            <ImSearch className={css.searchImg} />
          </button>
          <input
            type="text"
            autoComplete="off"
            autoFocus
            className={css.formInput}
            placeholder="Search your film..."
            onChange={e => updateQueryString(e.target.value.toLowerCase())}
            value={query}
          />
        </form>

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
