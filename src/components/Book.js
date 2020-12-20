import React from 'react';
import PropTypes from 'prop-types';

export default function Book({ book }) {
  const { id, title, category } = book;
  return (
    <tr className="book">
      <td>{id}</td>
      <td>{title}</td>
      <td>{category}</td>
    </tr>
  );
}

Book.propTypes = {
  book: PropTypes.objectOf(PropTypes.string).isRequired,
};
