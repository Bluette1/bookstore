import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeBook } from '../actions/index';

const Book = ({ book, handleRemoveBook }) => {
  const { title, category } = book;
  return (
    // <tr>
    //   <td>{id}</td>
    //   <td>{title}</td>
    //   <td>{category}</td>
    //   <td>
    //     <button
    //       type="button"
    //       className="submit-delete"
    //       onClick={() => handleRemoveBook(book)}
    //     >
    //       Remove Book
    //     </button>
    //   </td>
    // </tr>
    <div className="row">
      <div>
        <p className="category">{category}</p>
        <h4 className="title">{title}</h4>
        <ul className="update">
          <li>Comments</li>
          <li aria="hidden" role="presentation" onClick={() => handleRemoveBook(book)}>Remove</li>
          <li>Edit</li>
        </ul>
      </div>
      <div>
        <div className="percentage" />
      </div>
      <div>
        <h4 className="current-chapter">CURRENT CHAPTER</h4>
        <p className="current-lesson">Introduction</p>
      </div>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.objectOf(PropTypes.string).isRequired,
  handleRemoveBook: PropTypes.func.isRequired,
};

export default connect(null, { handleRemoveBook: removeBook })(Book);
