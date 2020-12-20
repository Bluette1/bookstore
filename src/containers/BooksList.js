import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Book from '../components/Book';
import { removeBook } from '../actions/index';

const BooksList = ({ books, removeBook }) => (
  <table className="books-list">
    <thead>
      <tr>
        <th colSpan="2">The Books List</th>
      </tr>
    </thead>
    <tbody>
      {books && books.length ? (
        books.map(book => <Book key={`book-${book.id}`} book={book} handleRemoveBook={removeBook} />)
      ) : (
        <tr>
          <th>&apos;No books added yet.&apos;</th>
        </tr>
      )}
    </tbody>
  </table>
);

const mapStateToProps = state => {
  const { books } = state;
  return { books };
};

BooksList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeBook: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { removeBook })(BooksList);
