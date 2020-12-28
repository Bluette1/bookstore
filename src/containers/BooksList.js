import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Book from '../components/Book';
import getBooksByFilter from '../selectors';

const BooksList = ({ books }) => (
  <div>
    {books && books.length ? (
      books.map(book => <Book key={`book-${book.id}`} book={book} />)
    ) : null}
  </div>
);

const mapStateToProps = state => {
  const { filter } = state;
  const books = getBooksByFilter(state, filter);
  return { books };
};

BooksList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(BooksList);
