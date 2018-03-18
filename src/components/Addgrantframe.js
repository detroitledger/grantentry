import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withPdfs } from '../containers/WithPdfs';

import './Addgrantframe.css';
import Instructions from './Instructions';
import Addgrantform from './Addgrantform';
import * as actions from '../actions';

class Addgrantframe extends Component {
  tourStart = () => this.props.tourStart()

  render() {
    const { haspdfs, isFetching, userpdfId, userpdfs } = this.props;

    if (isFetching && !userpdfs.length) {
      return <p>Loading...</p>;
    }

    if (!haspdfs) {
      return (
        <div>
          <Instructions tourStart={this.tourStart} />
        </div>
      );
    }

    const selectedPdf = userpdfs.find(p => p.id === parseInt(userpdfId, 10));
    const source = `IRS 990 ${selectedPdf.year} ${selectedPdf.pdfurl}`;

    return (
      <div className="Addgrantframe">
        <Addgrantform pdf={selectedPdf} source={source} />
      </div>
    );
  }
};

Addgrantframe.propTypes = {
  haspdfs: PropTypes.bool,
  userpdfId: PropTypes.string,
  userpdfs: PropTypes.array,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  tourStart: PropTypes.func.isRequired,
};

const AddgrantframeWrapped = withPdfs(connect(null, actions)(Addgrantframe));

export default AddgrantframeWrapped;
