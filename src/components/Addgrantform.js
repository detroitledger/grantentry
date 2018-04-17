import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import { InputAdornment } from 'material-ui/Input';
import Button from 'material-ui/Button';

import * as actions from '../actions';
import { withPdfs } from '../containers/WithPdfs';

import './Addgrantform.css';

/** Group of functions that take TextField input and return a bool */
const validators = {
  isNotNumber: function(val) {
    return isNaN(Number(val))
  },

  isFormattedAsDate: function(val) {
    let mmyyyy = RegExp('(0[1-9]|10|11|12)/20[0-9]{2}$')
    return mmyyyy.test(val);
  },

  isAfterDate: function(val) {
    // check end date is after start date
  },

  isValidLength: function(val) {
    // check that source string is reasonable length
  }
};

class Addgrantform extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: `01/${this.props.pdf.year}`,
      endDate: `12/${this.props.pdf.year}`,
      funder: this.props.pdf.org.name,
      recipient: '',
      amount: 0,
      description: '',
      internalNotes: '',
      source: this.props.source,
      errors: {},
      helpers: {
        recipient: "Can't find the recipient org? Add them here",
      },
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  createGrant(grant) {
    this.props.createGrant({
      start: this.state.startDate,
      end: this.state.endDate,
      funder: { id: this.props.pdf.org.id },
      recipient: { id: 123 },
      source: 'hi',
      amount: 666,
      description: 'hi',
      types: 'hi',
      tags: 'hi',
      internalNotes: 'hi',
    });
  }

  handleInputChange = name => event => {
    this.setState({ [name]: event.target.value, });

    // Field level validation to trigger error messages
    if (name === 'amount') {
      validators.isNotNumber(event.target.value) ? 
        this.setState({ errors: { [name]: true }, helpers: { [name]: 'Must be a positive number' }, }) 
        : this.setState({ errors: { [name]: false }, helpers: { [name]: '' }, });
    } else if (name === 'startDate' || name === 'endDate') {
      validators.isFormattedAsDate(event.target.value) ?
        this.setState({ errors: { [name]: false }, helpers: { [name]: '' }, })
        : this.setState({ errors: { [name]: true }, helpers: { [name]: 'Format like MM/YYYY' }, });
    } else if (name === 'endDate') {
      // should come after startDate
    } else if (name === 'source') {
      // is valid length 
    }
  }

  handleSubmit(event) {
    console.log(this.state);
    // this.createGrant(this.state);
    // event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div style={{ display: 'flex', flexWrap: 'wrap', }}>
          <TextField
            id="startDate"
            label="Start date"
            value={this.state.startDate}
            onChange={this.handleInputChange('startDate')}
            margin="normal"
            helperText={this.state.helpers.startDate}
            error={this.state.errors.startDate}
            required />
          <TextField
            id="endDate"
            label="End date"
            value={this.state.endDate}
            onChange={this.handleInputChange('endDate')}
            margin="normal"
            helperText={this.state.helpers.endDate}
            error={this.state.errors.endDate}
            required />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            id="funder"
            label="From"
            value={this.state.funder}
            onChange={this.handleInputChange('funder')}
            margin="normal"
            helperText={this.state.helpers.funder}
            error={this.state.errors.funder}
            required />
          <TextField
            id="recipient"
            label="To"
            value={this.state.recipient}
            onChange={this.handleInputChange('recipient')}
            helperText={this.state.helpers.recipient}
            error={this.state.errors.recipient}
            margin="normal"
            required />
          <TextField
            id="amount"
            label="Amount"
            value={this.state.amount}
            onChange={this.handleInputChange('amount')}
            margin="normal"
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            helperText={this.state.helpers.amount}
            error={this.state.errors.amount}
            required />
          <TextField
            id="description"
            label="Purpose or description"
            value={this.state.description}
            onChange={this.handleInputChange('description')}
            multiline
            margin="normal" />
          <TextField
            id="internalNotes"
            label="Internal notes"
            value={this.state.internalNotes}
            onChange={this.handleInputChange('internalNotes')}
            multiline
            margin="normal" />
          <TextField
            id="source"
            label="Source"
            value={this.state.source}
            onChange={this.handleInputChange('source')}
            margin="normal"
            helperText={this.state.helpers.source}
            error={this.state.errors.source}
            required />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '1em', }}>
          <Button type="submit" variant="raised" color="primary" size="large">
            Submit
          </Button>
        </div>
      </form>
    );
  }
};

Addgrantform.propTypes = {
  pdf: PropTypes.object.isRequired,
  source: PropTypes.string.isRequired,
};

Addgrantform = reduxForm({
  form: 'add-grant',
})(Addgrantform);

const AddgrantformWrapped = withPdfs(connect(null, actions)(Addgrantform));

export default AddgrantformWrapped;
