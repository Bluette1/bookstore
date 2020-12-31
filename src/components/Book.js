import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { removeBook } from '../actions/index';
import { httpProtocol, host, port } from '../envVariables';

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = { totalPages: 100, pagesRead: 0, showForm: false };
    this.handleRemoveBook = this.handleRemoveBook.bind(this);
    this.handleChangePagesRead = this.handleChangePagesRead.bind(this);
    this.handleChangeTotalPages = this.handleChangeTotalPages.bind(this);
    this.hideUpdateForm = this.hideUpdateForm.bind(this);
    this.showUpdateForm = this.showUpdateForm.bind(this);
  }

  handleChangePagesRead = pagesRead => {
    this.setState({ pagesRead });
  };

  handleChangeTotalPages = totalPages => {
    this.setState({ totalPages });
  };

  handleRemoveBook() {
    const { props: { book } } = this;
    axios.delete(`${httpProtocol}://${host}:${port}/books/${book.id}`)
      .then(() => {
        const { props: { book, removeBook } } = this;
        removeBook(book);
      });
  }

  showUpdateForm() {
    // document.getElementById('form').style.display = 'block';
    this.setState({ showForm: true });
  }

  hideUpdateForm() {
    // document.getElementById('form').style.display = 'none';
    this.setState({ showForm: false });
  }

  render() {
    const { props: { book } } = this;
    const { title, category } = book;
    const { pagesRead, totalPages, showForm } = this.state;
    const value = Math.round(pagesRead / totalPages);
    return (
      <div className="book-row">
        <div className="title-category">
          <p className="category">{category}</p>
          <h4 className="title">{title}</h4>
          <ul className="comments-section">
            <li>Comments</li>
            <li aria-hidden="true" role="presentation" onClick={() => this.handleRemoveBook()}>Remove</li>
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
          <button type="button" className="update-progress-btn" onClick={() => this.showUpdateForm()}>
            <span className="update-progress">UPDATE PROGRESS</span>
          </button>
          {showForm ? (
            <form id="form">
              <i className="fa fa-times-circle-o" aria-hidden="true" onClick={() => this.hideUpdateForm()} />
              <h2>Update Reading Progress</h2>
              <input id="pages-read" name="pages-read" placeholder="pages read" type="number" />
              <input id="total-pages" name="total-pages" placeholder="total-pages" type="number" />
              <input id="current-chapter" name="current-chapter" placeholder="current chapter" type="text" />
              <button type="submit" onClick={() => this.hideUpdateForm()}>OK</button>
            </form>
          ) : null }

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
