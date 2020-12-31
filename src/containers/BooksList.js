import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import Book from '../components/Book';
import getBooksByFilter from '../selectors';
import { registerBooks } from '../actions/index';

class BooksList extends React.Component {
  componentDidMount() {
    const httpProtocol = process.env.REACT_APP_REQUEST_OPTIONS_HTTP_PROTOCOL;
    const host = process.env.REACT_APP_REQUEST_OPTIONS_HOST;
    const port = process.env.REACT_APP_REQUEST_OPTIONS_PORT;
    axios.get(`${httpProtocol}://${host}:${port}/books`)
      .then(response => {
        const { props: { registerBooks } } = this;
        registerBooks(response.data);
      });
  }

  render() {
    const { props: { books } } = this;
    return (
      <div>
        {books && books.length ? (
          books.map(book => <Book key={`book-${book.id}`} book={book} />)
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { filter } = state;
  const books = getBooksByFilter(state, filter);
  return { books };
};

BooksList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  registerBooks: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { registerBooks })(BooksList);
