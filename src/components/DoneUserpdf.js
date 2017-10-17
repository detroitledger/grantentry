import React, { Component } from 'react';
import PropTypes from 'prop-types';

const DoneUserpdf = ({ toggleDoneHandler }) => (
  <input type="checkbox" checkedLink={toggleDoneHandler}/>
);

DoneUserpdf.propTypes = {
  toggleDoneHandler: PropTypes.func.isRequired,
};

export default DoneUserpdf;
