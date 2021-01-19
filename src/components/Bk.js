import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import 'react-circular-progressbar/dist/styles.css';
import { removeBook, updateBook } from '../actions/index';
import { httpProtocol, host, port } from '../envVariables';

class Bk extends React.Component {
  constructor(props) {
    super(props);
    const { props: { book } } = this;
    this.state = {
      showUpdateForm: false, ...book,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  handleRemoveBook() {
    const { props: { book } } = this;
    axios.delete(`${httpProtocol}://${host}:${port}/books/${book.id}`)
      .then(() => {
        const { props: { book, removeBook } } = this;
        removeBook(book);
      });
  }

  addToReadingList() {
    const { props: { book } } = this;
    const {
      pagesRead, currentChapter,
    } = this.state;
    axios.put(`${httpProtocol}://${host}:${port}/books/${book.id}/readings}`, {
      pagesRead, currentChapter,
    })
      .then(response => {
        const { props: { updateReading, showReading } } = this;
        updateReading(response.data);
        showReading();
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
      showUpdateForm, title, category, author,
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
          <button type="button" className="update-progress-btn" onClick={() => this.addToReadingList}>
            <span className="update-progress">ADD TO READING LIST</span>
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

Bk.propTypes = {
  book: PropTypes.objectOf(PropTypes.any).isRequired,
  removeBook: PropTypes.func.isRequired,
  updateReading: PropTypes.func.isRequired,
  showReading: PropTypes.func.isRequired,
};

export default connect(null, { removeBook, updateBook })(Bk);
