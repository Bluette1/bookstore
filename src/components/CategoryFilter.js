import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeFilter } from '../actions/index';
import { BOOK_CATEGORIES } from '../constants';

const CategoryFilter = ({ handleFilterChange }) => {
  const bookCategories = [...BOOK_CATEGORIES, 'all'];
  return (
    <label htmlFor="book-select">
      Filter according to category:
      <select
        name="book-categories"
        className="book-categories"
        id="book-filter"
        onChange={e => handleFilterChange(e.target.value)}
      >
        <option>--Please choose a category--</option>
        {bookCategories.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
        ;
      </select>
    </label>
  );
};

CategoryFilter.propTypes = {
  handleFilterChange: PropTypes.func.isRequired,
};

export default connect(null, { handleFilterChange: changeFilter })(CategoryFilter);
