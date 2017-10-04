import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Dropdown from 'react-dropdown';

const options = [ 'one', 'two', 'three' ]
const defaultOption = options[0]

const DropdownUserpdfs = ({ userpdfs }) => (
  <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select a 990" />
);

export default DropdownUserpdfs;
