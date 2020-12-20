import React from 'react';
import PropTypes from 'prop-types';

export default function Book({ book }) {
  const { ID, title, category } = book;
  return (
    <tr className="book">
      <td>{ID}</td>
      <td>{title}</td>
      <td>{category}</td>
    </tr>
  );
}

Book.propTypes = {
  book: PropTypes.objectOf(PropTypes.string).isRequired,
};
