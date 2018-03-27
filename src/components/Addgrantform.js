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

class Addgrantform extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipient: '',
      amount: null,
      description: '',
      startDate: `01/${this.props.pdf.year}`,
      endDate: `12/${this.props.pdf.year}`,
      funder: this.props.pdf.org.name,
      source: this.props.source,
      internalNotes: '',
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
      amount: '666',
      description: 'hi',
      types: 'hi',
      tags: 'hi',
      internalNotes: 'hi',
    });
  }

  handleInputChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

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
            required />
          <TextField
            id="endDate"
            label="End date"
            value={this.state.endDate}
            onChange={this.handleInputChange('endDate')}
            margin="normal"
            required />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            id="funder"
            label="From"
            value={this.state.funder}
            onChange={this.handleInputChange('funder')}
            margin="normal"
            required />
          <TextField
            id="recipient"
            label="To"
            value={this.state.recipient}
            onChange={this.handleInputChange('recipient')}
            helperText="Can't find the recipient org? Add them here"
            margin="normal"
            required />
          <TextField
            id="amount"
            label="Amount"
            value={this.state.amount}
            onChange={this.handleInputChange('amount')}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            margin="normal"
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
            value={this.state.description}
            onChange={this.handleInputChange('internalNotes')}
            multiline
            margin="normal" />
          <TextField
            id="source"
            label="Source"
            value={this.state.source}
            onChange={this.handleInputChange('source')}
            margin="normal"
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
