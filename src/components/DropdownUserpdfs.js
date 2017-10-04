import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import './DropdownUserpdfs.css';

const options = [ 'one', 'two', 'three' ]
const defaultOption = options[0]

class DropdownUserpdfs extends Component {
  componentDidMount() {
  	console.log(this.props.pdfs);
  }
  
  render() {
  	return (
      <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select a 990" />
  	)
  }
}

DropdownUserpdfs.propTypes = {
  pdfs: PropTypes.arrayOf(PropTypes.shape({
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

export default DropdownUserpdfs;
