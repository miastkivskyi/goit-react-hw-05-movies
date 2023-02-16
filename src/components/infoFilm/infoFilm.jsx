import PropTypes from 'prop-types';
import notFoundImage from '../../images/images.png';

import css from './infoFilm.module.css';

const InfoFilm = ({
  movie: {
    title,
    poster_path,
    vote_average,
    overview,
    genres,
    release_date,
    budget,
    runtime,
  },
}) => {
  function moviesImg(poster_path) {
    if (poster_path == null) {
      return notFoundImage;
    }
    return `https://image.tmdb.org/t/p/w300${poster_path}`;
  }

  return (
    <div className={css.detailsWrapper}>
      <div className={css.detailsInnerWrapper}>
        <div className={css.detailsWrapperImg}>
          <img
            className={css.detailsImg}
            src={moviesImg(poster_path)}
            alt={title}
            width="300"
          />
        </div>
        <div className={css.detailsWrapperInfo}>
          <h1 className={css.detailsTitle}>
            {title}
            <span className={css.detailsSpan}>
              ({`${release_date?.slice(0, 4)}`})
            </span>
          </h1>
          <p className={css.detailsText}>
            <b> User score:</b>{' '}
            {Math.round(Number(vote_average) * 10).toFixed(0)}%
          </p>

          <p className={css.detailsText}>
            <b>Genres:</b> {genres?.map(genre => genre.name).join(', ')}
          </p>
          <p className={css.detailsText}>
            <b>Runtime: </b> {runtime} minutes
          </p>
          {budget > 0 && (
            <p className={css.detailsText}>
              <b>Budget: </b> {budget}$
            </p>
          )}
          <p className={css.detailsText}>
            <b>Overview:</b> {overview}
          </p>
        </div>
      </div>
    </div>
  );
};

InfoFilm.propTypes = {
  movie: PropTypes.object,
};

export default InfoFilm;
