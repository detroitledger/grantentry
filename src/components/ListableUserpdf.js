import React from 'react';
import PropTypes from 'prop-types';

const ListableUserpdf = ({ onClick, userpdf }) => (
  <li
    onClick={onClick.bind(this, userpdf.id)}
    style={{
      textDecoration: userpdf.done ? 'line-through' : 'none',
    }}
  >
    {userpdf.org.name}
  </li>
);

ListableUserpdf.propTypes = {
  onClick: PropTypes.func.isRequired,
  userpdf: PropTypes.shape({
    id: PropTypes.number.isRequired,
    org: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    pdfurl: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
    year: PropTypes.number.isRequired,
    currentpg: PropTypes.number.isRequired,
  }),
};

export default ListableUserpdf;