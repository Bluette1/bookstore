import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import Bk from '../components/Bk';
import { getBooksByFilter } from '../selectors';
import { registerBooks } from '../actions/index';
import { httpProtocol, host, port } from '../envVariables';

class BooksList extends React.Component {
  componentDidMount() {
    axios.get(`${httpProtocol}://${host}:${port}/books`)
      .then(response => {
        const { props: { registerBooks } } = this;
        registerBooks(response.data.reverse());
      });
  }

  render() {
    const { props: { books, showReading } } = this;
    return (
      <div>
        {books && books.length ? (
          books.map(book => <Bk key={`book-${book.id}`} book={book} showReading={showReading} />)
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
  showReading: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { registerBooks })(BooksList);
