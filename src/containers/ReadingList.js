import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import BookRead from '../components/BookRead';
import { getReadingsByFilter } from '../selectors';
import { registerReading } from '../actions/index';
import { httpProtocol, host, port } from '../envVariables';

class ReadingList extends React.Component {
  componentDidMount() {
    const { props: { registerReading, user } } = this;
    axios.get(`${httpProtocol}://${host}:${port}/readings`, { headers: { Authorization: `Bearer ${user.authentication_token}` } })
      .then(response => {
        registerReading(response.data.reverse());
      });
  }

  render() {
    const { props: { reading } } = this;
    return (
      <div>
        {reading && reading.length ? (
          reading.map(book => <BookRead key={`book-${book.id}`} reading={book} />)
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { filter, user } = state;
  const reading = getReadingsByFilter(state, filter);
  return { reading, user };
};

ReadingList.propTypes = {
  reading: PropTypes.arrayOf(PropTypes.object).isRequired,
  registerReading: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, { registerReading })(ReadingList);
