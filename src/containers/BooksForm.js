import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BOOK_CATEGORIES } from '../constants';
import { createBook } from '../actions/index';

class BooksForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '', category: '' };
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
  }

    handleChangeTitle = title => {
      this.setState({ title });
    };

    handleChangeCategory = category => {
      this.setState({ category });
    };

    handleSubmit = () => {
      // dispatches actions to add or remove a book
      const { props: { createBook } } = this;
      const { state: { title, category } } = this;
      createBook(title, category);
      // resets the component's state
      this.setState({ title: '', category: '' });
      document.getElementById('book-select').selectedIndex = 0;
    };

    render() {
      const { state: { title } } = this;
      return (
        <div className="book-form">
          <h3 className="form-title">ADD NEW BOOK</h3>
          <input
            className="input-title"
            onChange={e => this.handleChangeTitle(e.target.value)}
            value={title}
            placeholder="Book title"
          />
          <select
            name="book-categories"
            className="choose-category"
            id="book-select"
            onChange={e => this.handleChangeCategory(e.target.value)}
          >
            <option>Category</option>
            {BOOK_CATEGORIES.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
            ;
          </select>
          <button
            type="button"
            className="submit"
            onClick={this.handleSubmit}
          >
            <span className="add-book">ADD BOOK</span>
          </button>
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
