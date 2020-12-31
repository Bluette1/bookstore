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
    this.state = {
      totalPages: 100, pagesRead: 0, showForm: false, currentChapter: 'Introduction',
    };
    this.handleRemoveBook = this.handleRemoveBook.bind(this);
    this.handleChangePagesRead = this.handleChangePagesRead.bind(this);
    this.handleChangeTotalPages = this.handleChangeTotalPages.bind(this);
    this.handleChangeCurrentChapter = this.handleChangeCurrentChapter.bind(this);
    this.hideUpdateForm = this.hideUpdateForm.bind(this);
    this.showUpdateForm = this.showUpdateForm.bind(this);
  }

  handleChangePagesRead = pagesRead => {
    this.setState({ pagesRead });
  };

  handleChangeTotalPages = totalPages => {
    this.setState({ totalPages });
  };

  handleChangeCurrentChapter = currentChapter => {
    this.setState({ currentChapter });
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
    this.setState({ showForm: true });
  }

  hideUpdateForm() {
    this.setState({ showForm: false });
  }

  render() {
    const { props: { book } } = this;
    const { title, category } = book;
    const {
      pagesRead, totalPages, showForm, currentChapter,
    } = this.state;
    const value = (pagesRead / totalPages).toFixed(2);
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
          <p className="current-lesson">{currentChapter}</p>
          <button type="button" className="update-progress-btn" onClick={() => this.showUpdateForm()}>
            <span className="update-progress">UPDATE PROGRESS</span>
          </button>
          {showForm ? (
            <div className="form-div">
              <div className="popup-form">
                <form id="form">
                  <i className="fa fa-times-circle-o fa-lg" aria-hidden="true" onClick={() => this.hideUpdateForm()} />
                  <h2>Update Reading Progress</h2>
                  <label htmlFor="book-title">{title}</label>
                  <input id="pages-read" name="pages-read" placeholder="pages read" type="number" onChange={e => this.handleChangePagesRead(e.target.value)} />
                  <input id="total-pages" name="total-pages" placeholder="total-pages" type="number" onChange={e => this.handleChangeTotalPages(e.target.value)} />
                  <input id="current-chapter" name="current-chapter" placeholder="current chapter" type="text" onChange={e => this.handleChangeCurrentChapter(e.target.value)} />
                  <button type="submit" onClick={() => this.hideUpdateForm()}>OK</button>
                </form>
              </div>
            </div>
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
