import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { removeBook } from '../actions/index';

const Book = ({ book, handleRemoveBook }) => {
  const { title, category } = book;
  const value = 0.66;
  return (
    <div className="book-row">
      <div className="title-category">
        <p className="category">{category}</p>
        <h4 className="title">{title}</h4>
        <ul className="comments-section">
          <li>Comments</li>
          <li aria="hidden" role="presentation" onClick={() => handleRemoveBook(book)}>Remove</li>
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
        <p className="current-lesson">Introduction</p>
      </div>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.objectOf(PropTypes.string).isRequired,
  handleRemoveBook: PropTypes.func.isRequired,
};

export default connect(null, { handleRemoveBook: removeBook })(Book);
