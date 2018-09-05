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

  if (values.start && !RegExp('(0[1-9]|10|11|12)/20[0-9]{2}$').test(values.start)) {
    errors.start = 'Start date should be MM/YYYY';
  } 

  if (values.end && !RegExp('(0[1-9]|10|11|12)/20[0-9]{2}$').test(values.end)) {
    errors.end = 'End date should be MM/YYYY';
  }

  if ((parseInt(values.end.substr(-4), 10) < parseInt(values.start.substr(-4), 10))) {
    errors.end = 'End date must be after start date';
  } else if ((parseInt(values.end.substr(-4), 10) === parseInt(values.start.substr(-4), 10))) {
    if ((parseInt(values.end.substr(0,2), 10) < parseInt(values.start.substr(0,2), 10))) {
      errors.end = 'End date must be after start date';
    }
  }

  if (values.source && values.source.length < 8) {
    errors.source = 'Source should be longer, eg "IRS 990 2017"';
  }

  return errors;
};

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField
    label={label}
    helperText={error}
    error={touched && error}
    margin="normal"
    {...input}
    {...custom} />
);

renderTextField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
};

class Addgrantform extends Component {
  static propTypes = {
    pdf: PropTypes.object.isRequired,
    source: PropTypes.string.isRequired,
    createGrant: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  createGrant(/*grant*/) {
    this.props.createGrant({
      start: `01/${this.props.pdf.year}`,
      end: `12/${this.props.pdf.year}`,
      funder: { id: this.props.pdf.org.id },
      recipient: { id: 123 },
      source: this.props.source,
      amount: 666,
      description: 'hi',
      internalNotes: 'hi',
    });
  }

  handleSubmit() {
    console.log(this.state);
    // this.createGrant(this.state);
    // event.preventDefault();
  }

  render() {
    const { invalid, pristine, submitting } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <Field
            name="start"
            component={renderTextField}
            label="Start Date"
            required />
          <Field
            name="end"
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
        <div style={{ display: 'flex', justifyContent: 'center', margin: '1em' }}>
          <Button type="submit" disabled={invalid || pristine || submitting} variant="raised" color="primary" size="large">
            Submit
          </Button>
        </div>
      </form>
    );
  }
}

const AddgrantformFormed = reduxForm({
  form: 'add-grant',
  validate,
})(Addgrantform);

const AddgrantformWrapped = connect(
  // map state to props
  (state, ownProps) => {
    return ({
      initialValues: {
        funder: `${ownProps.pdf.org.name} (${ownProps.pdf.org.id})`,
        start: `01/${ownProps.pdf.year}`,
        end: `12/${ownProps.pdf.year}`,
        source: `IRS 990 ${ownProps.pdf.year}`,
      },
    });
  },
  // map dispatch to props
  actions
)(withPdfs(AddgrantformFormed));

export default AddgrantformWrapped;
