import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import * as actions from '../actions';
import { withPdfs } from '../containers/WithPdfs';

import './Addgrantform.css';

class Addgrantform extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipient: '',
      amount: 0,
      description: '',
      startDate: this.props.pdf.year,
      endDate: this.props.pdf.year,
      funder: this.props.pdf.org.name,
      source: this.props.source,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  createGrant(grant) {
    this.props.createGrant({
      start: `01/${this.state.startDate}`,
      end: `12/${this.state.endDate}`,
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

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    console.log(this.state);
    this.createGrant(this.state);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="startDate">Start Date</label>
          <Field name="startDate" component="input" type="text" onChange={this.handleInputChange} />
        </div>
        <div>
          <label htmlFor="endDate">End Date</label>
          <Field name="endDate" component="input" type="text" onChange={this.handleInputChange} />
        </div>
        <div>
          <label htmlFor="funder">Funder</label>
          <Field name="funder" component="input" type="text" onChange={this.handleInputChange} />
        </div>
        <div>
          <label htmlFor="recipient">Recipient</label>
          <Field name="recipient" component="input" type="text" onChange={this.handleInputChange} />
        </div>
        <div>
          <label htmlFor="amount">Amount</label>
          <Field name="amount" component="input" type="text" onChange={this.handleInputChange} />
        </div>
        <div>
          <label htmlFor="description">Description/Purpose</label>
          <Field name="description" component="textarea" type="text" onChange={this.handleInputChange} />
        </div>
        <div>
          <label htmlFor="source">Source</label>
          <Field name="source" component="input" type="text" onChange={this.handleInputChange} />
        </div>
        <button type="submit">Submit</button>
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
