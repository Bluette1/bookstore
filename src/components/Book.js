import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { removeBook } from '../actions/index';

const handleRemoveBook = (book, removeBook) => {
  const httpProtocol = process.env.REACT_APP_REQUEST_OPTIONS_HTTP_PROTOCOL;
  const host = process.env.REACT_APP_REQUEST_OPTIONS_HOST;
  const port = process.env.REACT_APP_REQUEST_OPTIONS_PORT;

  axios.delete(`${httpProtocol}://${host}:${port}/books/${book.id}`)
    .then(() => {
      removeBook(book);
    });
};

const Book = ({ book, removeBook }) => {
  const { title, category } = book;
  const value = 0.66;
  return (
    <div className="book-row">
      <div className="title-category">
        <p className="category">{category}</p>
        <h4 className="title">{title}</h4>
        <ul className="comments-section">
          <li>Comments</li>
          <li aria-hidden="true" role="presentation" onClick={() => handleRemoveBook(book, removeBook)}>Remove</li>
          <li>Edit</li>
        </ul>
      </div>
      <div className="progress">
        <div className="progressBar">
          <CircularProgressbar className="progressBar" value={value} maxValue={1} />
        </div>
        <div>
          <h4 className="percent">
            {`${value * 100}%`}
          </h4>
          <p className="completed">Completed</p>
        </div>
      </div>
      <div>
        <h4 className="current-chapter">CURRENT CHAPTER</h4>
        <p className="current-lesson">Chapter 17</p>
        <button className="update-progress-btn" type="submit"><span className="update-progress">UPDATE PROGRESS</span></button>
      </div>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.objectOf(PropTypes.any).isRequired,
  removeBook: PropTypes.func.isRequired,
};

export default connect(null, { removeBook })(Book);
