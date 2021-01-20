import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import Book from '../components/Book';
import { getBooksByFilter } from '../selectors';
import { registerBooks } from '../actions/index';
import { httpProtocol, host, port } from '../envVariables';

class BooksList extends React.Component {
  componentDidMount() {
    const { props: { registerBooks, user } } = this;
    axios.get(`${httpProtocol}://${host}:${port}/books`, { headers: { Authorization: `Bearer ${user.authentication_token}` } })
      .then(response => {
        registerBooks(response.data.reverse());
      });
  }

  render() {
    const { props: { books, showReading } } = this;
    return (
      <div>
        {books && books.length ? (
          books.map(book => <Book key={`book-${book.id}`} book={book} showReading={showReading} />)
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { filter, user } = state;
  const books = getBooksByFilter(state, filter);
  return { books, user };
};

BooksList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  registerBooks: PropTypes.func.isRequired,
  showReading: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, { registerBooks })(BooksList);
