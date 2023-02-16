import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { findMoviesCast } from '../../shared/api';
import Loader from '../../components/loader/loader';

import css from './cast.module.css';
import PropTypes from 'prop-types';
import notImage from '../../images/notAvatar.png';

const Cast = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [cast, setCast] = useState([]);
  const [credits, setCredits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      return;
    }
    setIsLoading(true);

    findMoviesCast(id)
      .then(setCast, setCredits)
      .catch(Error)
      .finally(setIsLoading(false));
  }, [id]);

  if (!credits) {
    return;
  }

  return (
    <div>
      {isLoading && <Loader />}
      {credits && (
        <div className={css.container}>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={css.button}
          >
            Step back
          </button>
          <ul className={css.castList}>
            {cast?.map(({ id, name, profile_path }) => (
              <li key={id} className={css.castItem}>
                <div className={css.castWrapImg}>
                  <img
                    className={css.castImg}
                    src={
                      profile_path
                        ? `https://image.tmdb.org/t/p/w500${profile_path}`
                        : notImage
                    }
                    alt={name}
                    width="100"
                    loading="lazy"
                  />
                </div>
                <div className={css.castConteinerText}>
                  <p>{name}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

Cast.propTypes = {
  cast: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      profile_path: PropTypes.string.isRequired,
    })
  ),
};

export default Cast;
