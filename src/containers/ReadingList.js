import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import Book from '../components/Book';
import { getReadingsByFilter } from '../selectors';
import { registerReading } from '../actions/index';
import { httpProtocol, host, port } from '../envVariables';

class ReadingList extends React.Component {
  componentDidMount() {
    const { props: { registerReading, authentication } } = this;
    axios.get(`${httpProtocol}://${host}:${port}/readings`, { headers: { Authorization: `Bearer ${authentication.authentication_token}` } })
      .then(response => {
        registerReading(response.data.reverse());
      });
  }

  render() {
    const { props: { reading } } = this;
    return (
      <div>
        {reading && reading.length ? (
          reading.map(book => <Book key={`book-${book.id}`} reading={book} />)
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { filter, authentication } = state;
  const reading = getReadingsByFilter(state, filter);
  return { reading, authentication };
};

ReadingList.propTypes = {
  reading: PropTypes.arrayOf(PropTypes.object).isRequired,
  registerReading: PropTypes.func.isRequired,
  authentication: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, { registerReading })(ReadingList);
