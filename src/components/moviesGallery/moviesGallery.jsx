import { useLocation, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import notFoundImage from '../../images/images.png';
import css from './moviesGallery.module.css';

const MoviesGallary = ({ movies }) => {
  const location = useLocation();
  return (
    <ul className={css.list_Home}>
      {movies.map(({ id, original_title, name, poster_path }) => (
        <li className={css.item_Home} key={id}>
          <Link
            className={css.item_Link}
            to={`/movies/${id}`}
            state={{ from: location }}
          >
            <img
              src={
                poster_path
                  ? 'https://image.tmdb.org/t/p/w400' + poster_path
                  : notFoundImage
              }
              alt={original_title}
              className={css.img_Home}
            />
            <h1 className={css.item_Title}>{original_title || name}</h1>
          </Link>
        </li>
      ))}
    </ul>
  );
};

MoviesGallary.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      original_title: PropTypes.string,
      poster_path: PropTypes.string,
      name: PropTypes.string,
    })
  ),
};

export default MoviesGallary;
