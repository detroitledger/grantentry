import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

const ListUserpdfs = ({ userpdfs, onUserpdfClick }) => (
  <ul>
    {userpdfs.map(userpdf =>
      <li key={userpdf.id}>
        <Link to={'/' + userpdf.id}>
          {userpdf.org.name} ({userpdf.year})
        </Link>
      </li>
    )}
  </ul>
);

ListUserpdfs.propTypes = {
  userpdfs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    org: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    pdfurl: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
    year: PropTypes.number.isRequired,
    currentpg: PropTypes.number.isRequired,
  }).isRequired).isRequired,
};

export default ListUserpdfs;