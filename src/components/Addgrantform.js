import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Start date:
          <input name="startDate" type="text" value={this.state.startDate} onChange={this.handleInputChange} />
        </label>
        <label>
          End date:
          <input name="endDate" type="text" value={this.state.endDate} onChange={this.handleInputChange} />
        </label>
        <label>
          Funder:
          <input name="funder" type="text" value={this.state.funder} onChange={this.handleInputChange} />
        </label>
        <label>
          Recipient:
          <input name="recipient" type="text" value={this.state.recipient} onChange={this.handleInputChange} />
        </label>
        <label>
          Amount:
          <input name="amount" type="text" value={this.state.amount} onChange={this.handleInputChange} />
        </label>
        <label>
          description:
          <textarea name="description" type="text" value={this.state.description} onChange={this.handleInputChange} />
        </label>
        <label>
          Source:
          <input name="source" type="text" value={this.state.source} onChange={this.handleInputChange} />
        </label>
        <input type="submit" value="Save & Add Another" />
      </form>
    );
  }
};

Addgrantform.propTypes = {
  pdf: PropTypes.object.isRequired,
  source: PropTypes.string.isRequired,
};

export default Addgrantform;
