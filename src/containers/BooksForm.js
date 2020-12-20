import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BOOK_CATEGORIES from '../constants';
import { createBook } from '../actions/index';

class BooksForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '', category: '' };
  }

    updateTitle = title => {
      this.setState({ title });
    };

    updateCategory = category => {
      this.setState({ category });
    };

    handleCreateBook = () => {
      // dispatches actions to add or remove a book
      const { props: { createBook } } = this;
      const { state: { title, category } } = this;
      createBook(title, category);
      // sets state back to initial values
      this.setState({ title: '', category: '' });
    };

    render() {
      const { state: { title, category } } = this;
      return (
        <div>
          <input
            onChange={e => this.updateTitle(e.target.value)}
            value={title}
          />
          <label htmlFor="book-select">
            Choose a category:
            <select name="book-categories" id="book-select">
              <option value={category} onChange={e => this.updateCategory(e.target.value)}>
                --Please choose a category--
              </option>
              {BOOK_CATEGORIES.map(option => <option key={option} value={`${option}`}>{option}</option>)}
              ;
            </select>
          </label>
          <div className="submitBtns">
            <button type="button" className="submit" onClick={this.handleBookAction}>
              Add Book
            </button>
          </div>
        </div>
      );
    }
}

BooksForm.propTypes = {
  createBook: PropTypes.func.isRequired,
};

export default connect(
  null,
  { createBook },
)(BooksForm);
