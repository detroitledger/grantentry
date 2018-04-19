import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import TextField from 'material-ui/TextField';
import { InputAdornment } from 'material-ui/Input';
import Button from 'material-ui/Button';

import * as actions from '../actions';
import { withPdfs } from '../containers/WithPdfs';

import './Addgrantform.css';

const validate = values => {
  const errors = {};

  if (values.amount && isNaN(Number(values.amount))) {
    errors.amount = 'Amount must be a number';
  }
  if (values.startDate && !RegExp('(0[1-9]|10|11|12)/20[0-9]{2}$').test(values.startDate)) {
    errors.startDate = 'Start date should be MM/YYYY';
  } 
  if (values.endDate && !RegExp('(0[1-9]|10|11|12)/20[0-9]{2}$').test(values.endDate)) {
    errors.endDate = 'End date should be MM/YYYY';
  }

  return errors;
}

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField
    label={label}
    helperText={error}
    error={touched && error}
    margin="normal"
    {...input}
    {...custom} />
);

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

  handleSubmit(event) {
    console.log(this.state);
    // this.createGrant(this.state);
    // event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div style={{ display: 'flex', flexWrap: 'wrap', }}>
          <Field
            name="startDate"
            component={renderTextField}
            label="Start Date"
            required />
          <Field
            name="endDate"
            component={renderTextField}
            label="End Date"
            required />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Field
            name="funder"
            component={renderTextField}
            label="From"
            required />
          <Field
            name="recipient"
            component={renderTextField}
            label="To"
            required />
          <Field
            name="amount"
            component={renderTextField}
            label="Amount"
            required
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }} />
          <Field
            name="description"
            component={renderTextField}
            label="Purpose or description"
            multiline
            rowsMax="4" />
          <Field
            name="internalNotes"
            component={renderTextField}
            label="Internal notes"
            multiline
            rowsMax="2" />
          <Field
            name="source"
            component={renderTextField}
            label="Source"
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
  validate
})(Addgrantform);

const AddgrantformWrapped = withPdfs(connect(null, actions)(Addgrantform));

export default AddgrantformWrapped;
