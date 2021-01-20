import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import 'react-circular-progressbar/dist/styles.css';
import { removeBook, updateBook, addToReading } from '../actions/index';
import { httpProtocol, host, port } from '../envVariables';

class Book extends React.Component {
  constructor(props) {
    super(props);
    const { props: { book } } = this;
    this.state = {
      showUpdateForm: false, ...book, read: false,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  addToReadingList = () => {
    const { props: { book, user } } = this;
    const {
      pagesRead, currentChapter,
    } = this.state;
    axios.post(`${httpProtocol}://${host}:${port}/books/${book.id}/readings`,
      { pagesRead, currentChapter },
      { headers: { Authorization: `Bearer ${user.authentication_token}` } })
      .then(response => {
        const { props: { addToReading, showReading } } = this;
        addToReading(response.data);
        showReading();
        this.setState({
          read: true,
        });
      });
  }

  handleRemoveBook() {
    const { props: { book, user } } = this;
    axios.delete(`${httpProtocol}://${host}:${port}/books/${book.id}`,
      { headers: { Authorization: `Bearer ${user.authentication_token}` } })
      .then(() => {
        const { props: { book, removeBook } } = this;
        removeBook(book);
      });
  }

  handleUpdateBook() {
    const { props: { book, user } } = this;
    axios.put(`${httpProtocol}://${host}:${port}/books/${book.id}`,
      { headers: { Authorization: `Bearer ${user.authentication_token}` } })
      .then(() => {
        const { props: { book, updateBook } } = this;
        updateBook(book);
      });
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
      totalPages,
      showUpdateForm, title, category, author, read,
      showReading,
    } = this.state;

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
        <div>
          <h4 className="current-chapter">TOTAL PAGES</h4>
          <p className="current-lesson">{totalPages}</p>
          <button type="button" className="update-progress-btn" onClick={read ? showReading : this.addToReadingList}>
            <span className="update-progress">
              {read ? 'REMOVE FROM READING LIST' : 'ADD TO READING LIST'}
            </span>
          </button>
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
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  book: PropTypes.objectOf(PropTypes.any).isRequired,
  removeBook: PropTypes.func.isRequired,
  updateBook: PropTypes.func.isRequired,
  showReading: PropTypes.func.isRequired,
  addToReading: PropTypes.func.isRequired,
};

export default connect(
  state => ({ user: state.user }),
  { removeBook, updateBook, addToReading },
)(Book);
