import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { findMoviesReviews } from '../../shared/api';

import Loader from '../../components/loader/loader';
import css from './reviews.module.css';
import PropTypes from 'prop-types';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    setIsLoading(true);

    findMoviesReviews(id)
      .then(setReviews)
      .catch(Error)
      .finally(setIsLoading(false));
  }, [id]);

  return (
    <div>
      {isLoading && <Loader />}
      {reviews && (
        <div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={css.button}
          >
            Step back
          </button>

          <ul className={css.reviewsList}>
            {reviews && reviews.length ? (
              reviews?.map(({ id, author, content }) => (
                <li className={css.reviewsItem} key={id}>
                  <h3 className={css.reviewsTitle}>Author: {author}</h3>
                  <p className={css.reviewsContent}>{content}</p>
                </li>
              ))
            ) : (
              <p className={css.message}>
                We don't have any reviews for this movie.
              </p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      author: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
};

export default Reviews;
