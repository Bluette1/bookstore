import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { removeBook } from '../actions/index';

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemoveBook = this.handleRemoveBook.bind(this);
  }

  handleRemoveBook(book) {
    axios.delete(`http://localhost:3000/books/${book.id}`)
      .then(() => {
        const { removeBook } = this.props;
        removeBook(book);
      });
  }

  render() {
    const { book } = this.props;
    const { book: { title, category } } = this.props;
    const value = 0.66;
    return (
      <div className="book-row">
        <div className="title-category">
          <p className="category">{category}</p>
          <h4 className="title">{title}</h4>
          <ul className="comments-section">
            <li>Comments</li>
            <li aria-hidden="true" role="presentation" onClick={() => this.handleRemoveBook(book, removeBook)}>Remove</li>
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
  }
}

Book.propTypes = {
  book: PropTypes.objectOf(PropTypes.any).isRequired,
  removeBook: PropTypes.func.isRequired,
};

export default connect(null, { removeBook })(Book);
