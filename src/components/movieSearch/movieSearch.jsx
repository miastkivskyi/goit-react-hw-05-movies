import { useState } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import { ImSearch } from 'react-icons/im';
import css from '../movieSearch/movieSearch.module.css';

const MovieSearch = ({ query, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState(query);

  const handleSubmit = e => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      return toast.warn('Please enter some world');
    }
    onSearch(searchQuery);
    setSearchQuery('');
  };

  return (
    <>
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
          onChange={e => setSearchQuery(e.target.value.toLowerCase())}
          value={searchQuery}
        />
      </form>
      <ToastContainer position="top-center" autoClose={2500} theme="colored" />
    </>
  );
};

MovieSearch.propTypes = {
  query: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
};
export default MovieSearch;
