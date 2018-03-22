import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './RecentGrants.css';

class RecentGrants extends Component {
  constructor(props) {
    super(props);
    this.renderGrant = this.renderGrant.bind(this);
  }

  static propTypes = {
    grants: PropTypes.array.isRequired,
  };

  formatDate(date) {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  }

  renderGrant({ from, to, start, end, amount }) {
    return (
      <div className="grant">
        <h2>
          <span className="orgname">{from}</span> to{' '}
          <span className="orgname">{to}</span>
        </h2>
        <div className="metadata">${amount.toLocaleString()}</div>
        <div className="metadata">
          {this.formatDate(start)} - {this.formatDate(end)}
        </div>
      </div>
    );
  }

  render() {
    const grants = [
      {
        from: 'Comerica Charitable Foundation',
        to: 'Detroit Ledger',
        start: new Date('1/1/1918'),
        end: new Date('1/12/1919'),
        amount: 5,
      },
      {
        from: 'Comerica Charitable Foundation',
        to: 'Detroit Ledger',
        start: new Date('1/1/2027'),
        end: new Date('1/12/2028'),
        amount: 100000,
      },
    ];
    return (
      <div className="RecentGrants">
        <h1>Recent grants</h1>
        {grants.map(this.renderGrant)}
      </div>
    );
  }
}

export default RecentGrants;
