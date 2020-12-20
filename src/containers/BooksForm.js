import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BOOK_CATEGORIES from '../constants';
import { bookAction } from '../actions';

class BooksForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: '', category: '' };
  }

    updateInput = input => {
      this.setState({ input });
    };

    updateCategory = category => {
      this.setState({ category });
    };

    handleBookAction = () => {
      // dispatches actions to add or remove a book
      const { props: { bookAction } } = this;
      const { state: { input } } = this;
      bookAction(input);
      // sets state back to initial values
      this.setState({ input: '', category: '' });
    };

    render() {
      const { state: { input, category } } = this;
      return (
        <div>
          <input
            onChange={e => this.updateInput(e.target.value)}
            value={input}
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
            <button type="button" className="submit" onClick={this.handleBookAction}>
              Remove Book
            </button>
          </div>
        </div>
      );
    }
}

BooksForm.propTypes = {
  bookAction: PropTypes.func.isRequired,
};

export default connect(
  null,
  { bookAction },
)(BooksForm);
