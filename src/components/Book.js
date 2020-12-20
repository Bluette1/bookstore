import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeBook } from '../actions/index';

const Book = ({ book, handleRemoveBook }) => {
  const { id, title, category } = book;
  return (
    <tr className="book">
      <td>{id}</td>
      <td>{title}</td>
      <td>{category}</td>
      <td>
        <button
          type="button"
          className="submit"
          onClick={() => handleRemoveBook(book)}
        >
          Remove Book
        </button>
      </td>
    </tr>
  );
};

Book.propTypes = {
  book: PropTypes.objectOf(PropTypes.string).isRequired,
  handleRemoveBook: PropTypes.func.isRequired,
};

export default connect(null, { handleRemoveBook: removeBook })(Book);
