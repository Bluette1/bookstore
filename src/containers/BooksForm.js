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
    // this.handleChangeCategory = this.handleChangeCategory.bind(this);
    // this.handleChangeTitle = this.handleChangeTitle.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleChangeTitle = title => {
  //   this.setState({ title });
  // };

  // handleChangeCategory = category => {
  //   this.setState({ category });
  // };

    handleChange = ({ target: { name, value } }) => {
      this.setState({
        [name]: value,
      });
    }

    handleSubmit = () => {
      const { state: { title, category, totalPages } } = this;
      const { props: { createBook } } = this;
      axios.post(`${httpProtocol}://${host}:${port}/books`, { title, category, totalPages })
        .then(response => {
          createBook(response.data);
        });

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
            onChange={this.handleChange}
            value={title}
            placeholder="Book title"
          />

          <input
            className="input-title"
            onChange={this.handleChange}
            value={title}
            placeholder="Book title"
          />
          <select
            name="book-categories"
            className="choose-category"
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
        </div>
      );
    }
}

BooksForm.propTypes = {
  createBook: PropTypes.func.isRequired,
};
export default connect(null, { createBook })(BooksForm);
