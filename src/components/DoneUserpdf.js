import React from 'react';
import PropTypes from 'prop-types';

import './DoneUserpdf.css';

const DoneUserpdf = ({ toggleDoneHandler }) => (
  <div className="DoneUserpdf">
    <label htmlFor="done">Done?&nbsp;</label>
    <input id="done" type="checkbox" checkedLink={toggleDoneHandler}/>
  </div>
);

DoneUserpdf.propTypes = {
  toggleDoneHandler: PropTypes.func.isRequired,
};

export default DoneUserpdf;
