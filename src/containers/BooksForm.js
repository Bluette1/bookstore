import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BOOK_CATEGORIES } from '../constants';
import { createBook } from '../actions/index';
import { httpProtocol, host, port } from '../envVariables';

class BooksForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '', category: '', totalPages: 100 };
  }

    handleChange = ({ target: { name, value } }) => {
      this.setState({
        [name]: value,
      });
    }

    handleSubmit = () => {
      const { state: { title, category, totalPages } } = this;
      const { props: { createBook, user } } = this;
      axios.post(`${httpProtocol}://${host}:${port}/books`, { title, category, totalPages }, { headers: { Authorization: `Bearer ${user.authentication_token}` } })
        .then(response => {
          createBook(response.data);
        });

      // resets the component's state
      this.setState({ title: '', category: '' });
      document.getElementById('book-select').selectedIndex = 0;
    };

    render() {
      const { state: { title, totalPages, category } } = this;
      return (
        <form className="book-form">
          <h3 className="form-title">ADD NEW BOOK</h3>
          <input
            className="input-title"
            onChange={this.handleChange}
            name="title"
            value={title}
            placeholder="Book title"
          />

          <input
            className="input-title"
            name="totalPages"
            onChange={this.handleChange}
            value={totalPages}
            placeholder="Total Pages"
          />
          <select
            className="choose-category"
            name="category"
            value={category}
            id="book-select"
            onChange={this.handleChange}
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
        </form>
      );
    }
}

BooksForm.propTypes = {
  createBook: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default connect(
  state => ({ user: state.user }), { createBook },
)(BooksForm);
