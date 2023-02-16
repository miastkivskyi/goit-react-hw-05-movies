import style from './singleMovie.module.css';
import { useEffect, useState, Suspense } from 'react';
import {
  useParams,
  Outlet,
  NavLink,
  Link,
  useLocation,
} from 'react-router-dom';

import Loader from '../../components/loader/loader';
import { findMoviesbyID } from '../../shared/api';
import InfoFilm from '../infoFilm/infoFilm';
import PropTypes from 'prop-types';

const MoviesDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState({});
  const { id } = useParams();
  const location = useLocation();
  const back = location.state?.from ?? '/';

  useEffect(() => {
    setIsLoading(true);
    findMoviesbyID(Number(id))
      .then(setMovie)
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (!id) {
    return;
  }

  return (
    <div>
      {isLoading && <Loader />}
      <Link to={back} state={{ from: location }} className={style.backLink}>
        <p className={style.backText}>Go back</p>
      </Link>

      {movie && <InfoFilm movie={movie} />}
      <div className={style.InfoWrapper}>
        <ul className={style.InfoList}>
          <li className={style.InfoItem}>
            <NavLink
              to="cast"
              state={{ from: back }}
              className={({ isActive }) =>
                isActive ? `${style.active}` : `${style.inActive}`
              }
            >
              Cast
            </NavLink>
          </li>
          <li className={style.InfoItem}>
            <NavLink
              to="reviews"
              state={{ from: back }}
              className={({ isActive }) =>
                isActive ? `${style.active}` : `${style.inActive}`
              }
            >
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>
      <Suspense fallback={<p>Please Wait</p>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

MoviesDetails.propTypes = {
  movie: PropTypes.object,
};

export default MoviesDetails;
