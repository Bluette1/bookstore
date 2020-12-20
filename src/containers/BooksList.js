import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Book from '../components/Book';

const BooksList = ({ books }) => (
  <table className="books-list">
    <thead>
      <tr>
        <th colSpan="2" className="table-heading">The Books List</th>
      </tr>
    </thead>
    <tbody>
      {books && books.length ? (
        books.map(book => <Book key={`book-${book.id}`} book={book} />)
      ) : (
        <tr>
          <th className="no-books">&apos;No books added yet.&apos;</th>
        </tr>
      )}
    </tbody>
  </table>
);

const mapStateToProps = state => {
  const { books } = state.books;
  return { books };
};

BooksList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(BooksList);
