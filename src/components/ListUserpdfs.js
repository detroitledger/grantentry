import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './ListUserpdfs.css';

const ListUserpdfs = ({ userpdfs, makeToggleDoneHandler }) => (
  <ul className="ListUserpdfs">
    {userpdfs.map(userpdf =>
      <li key={userpdf.id}>
        <Link to={'/' + userpdf.id} className={userpdf.done ? 'ListUserpdfs-toggle_completed' : 'ListUserpdfs-toggle_active'}>
          {userpdf.org.name} ({userpdf.year})
        </Link>
        <input type="checkbox" checkedLink={makeToggleDoneHandler(userpdf)} />
      </li>
    )}
  </ul>
);

ListUserpdfs.propTypes = {
  makeToggleDoneHandler: PropTypes.func.isRequired,
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
