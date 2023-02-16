import { useState, useEffect } from 'react';

import { findAllMovies } from '../../shared/api';
import Loader from '../../components/loader/loader';

import MoviesGallary from '../../components/moviesGallery/moviesGallery';
import css from '../Home/Home.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    findAllMovies()
      .then(setMovies)
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className={css.container}>
      {isLoading && <Loader />}
      {movies.length > 0 && (
        <>
          <h1>Trending of the week</h1>
          <MoviesGallary movies={movies} />
        </>
      )}
    </div>
  );
};

export default HomePage;
