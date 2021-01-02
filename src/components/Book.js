import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { removeBook, updateBook } from '../actions/index';
import { httpProtocol, host, port } from '../envVariables';

class Book extends React.Component {
  constructor(props) {
    super(props);
    const { props: { book } } = this;
    this.state = {
      showProgressForm: false, showUpdateForm: false, ...book,
    };
    this.handleRemoveBook = this.handleRemoveBook.bind(this);
    this.handleChangePagesRead = this.handleChangePagesRead.bind(this);
    this.handleChangeTotalPages = this.handleChangeTotalPages.bind(this);
    this.handleChangeCurrentChapter = this.handleChangeCurrentChapter.bind(this);
    this.handleUpdateBook = this.handleUpdateBook.bind(this);
    this.hideUpdateForm = this.hideUpdateForm.bind(this);
    this.hideUpdateProgressForm = this.hideUpdateProgressForm.bind(this);
    this.showUpdateForm = this.showUpdateForm.bind(this);
    this.showUpdateProgressForm = this.showUpdateProgressForm.bind(this);
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

  handleChangeTitle = title => {
    this.setState({ title });
  };

  handleChangeCategory = category => {
    this.setState({ category });
  };

  handleChangeAuthor = author => {
    this.setState({ author });
  };

  handleRemoveBook() {
    const { props: { book } } = this;
    axios.delete(`${httpProtocol}://${host}:${port}/books/${book.id}`)
      .then(() => {
        const { props: { book, removeBook } } = this;
        removeBook(book);
      });
  }

  handleUpdateBook() {
    const { props: { book } } = this;
    const {
      pagesRead, totalPages, currentChapter, title, category, author,
    } = this.state;
    axios.put(`${httpProtocol}://${host}:${port}/books/${book.id}`, {
      pagesRead, totalPages, currentChapter, title, category, author,
    })
      .then(response => {
        const { props: { updateBook } } = this;
        updateBook(response.data);
      });
  }

  showUpdateProgressForm() {
    this.setState({ showProgressForm: true });
  }

  hideUpdateProgressForm() {
    this.setState({ showProgressForm: false });
    this.handleUpdateBook();
  }

  showUpdateForm() {
    this.setState({ showUpdateForm: true });
  }

  hideUpdateForm() {
    this.setState({ showUpdateForm: false });
    this.handleUpdateBook();
  }

  render() {
    const {
      pagesRead,
      totalPages,
      showProgressForm, showUpdateForm, currentChapter, title, category, author,
    } = this.state;
    const value = (pagesRead / totalPages).toFixed(2);

    return (
      <div className="book-row">
        <div className="title-category">
          <p className="category">{category}</p>
          <h4 className="title">{title}</h4>
          <p className="author">{author}</p>
          <ul className="comments-section">
            <li>Comments</li>
            <li aria-hidden="true" role="presentation" onClick={() => this.handleRemoveBook()}>Remove</li>
            <li role="presentation" onClick={() => this.showUpdateForm()}>Edit</li>
          </ul>
        </div>
        <div className="progress">
          <div className="progressBar">
            <CircularProgressbar className="progressBar" value={value} maxValue={1} />
          </div>
          <div>
            <h4 className="percent">
              {`${Math.round(value * 100)}%`}
            </h4>
            <p className="completed">Completed</p>
          </div>
        </div>
        <div>
          <h4 className="current-chapter">CURRENT CHAPTER</h4>
          <p className="current-lesson">{currentChapter}</p>
          <button type="button" className="update-progress-btn" onClick={() => this.showUpdateProgressForm()}>
            <span className="update-progress">UPDATE PROGRESS</span>
          </button>
          {showProgressForm ? (
            <div className="form-div">
              <div className="popup-form">
                <form id="form">
                  <i className="fa fa-times-circle-o fa-lg" aria-hidden="true" onClick={() => this.hideUpdateProgressForm()} />
                  <h2>Update Reading Progress</h2>
                  <p htmlFor="book-title" className="book-title">
                    {title}
                    <br />
                  </p>
                  <label htmlFor="pages-read">
                    Pages read:
                    <input id="pages-read" name="pages-read" placeholder={pagesRead} type="number" onChange={e => this.handleChangePagesRead(e.target.value)} />
                  </label>
                  <label htmlFor="total-pages">
                    Total pages:
                    <input id="total-pages" name="total-pages" placeholder={totalPages} type="number" onChange={e => this.handleChangeTotalPages(e.target.value)} />
                  </label>
                  <label htmlFor="current-chapter">
                    Current chapter:
                    <input id="current-chapter" name="current-chapter" placeholder={currentChapter} type="text" onChange={e => this.handleChangeCurrentChapter(e.target.value)} />
                  </label>
                  <button type="submit" onClick={() => this.hideUpdateProgressForm()}>OK</button>
                </form>
              </div>
            </div>
          ) : null }
          {showUpdateForm ? (
            <div className="form-div">
              <div className="popup-form">
                <form id="form">
                  <i className="fa fa-times-circle-o fa-lg" aria-hidden="true" onClick={() => this.hideUpdateForm()} />
                  <h2>Update book</h2>
                  <label htmlFor="book-title">
                    Title:
                    <input id="title" name="title" placeholder={title} type="text" onChange={e => this.handleChangeTitle(e.target.value)} />
                  </label>
                  <label htmlFor="book-category">
                    Category:
                    <input id="category" name="category" placeholder={category} type="text" onChange={e => this.handleChangeCategory(e.target.value)} />
                  </label>
                  <label htmlFor="book-author">
                    Author:
                    <input id="book-author" name="author" placeholder={author} type="text" onChange={e => this.handleChangeAuthor(e.target.value)} />
                  </label>
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
  updateBook: PropTypes.func.isRequired,
};

export default connect(null, { removeBook, updateBook })(Book);
