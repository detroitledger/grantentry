import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { updateUserpdf } from '../actions';
import { withPdfs } from '../containers/WithPdfs';

import Pdfviewer from './Pdfviewer';

class PdfviewerContainer extends Component {
  onPagechange = currentpg => {
    this.props.dispatch(updateUserpdf(this.props.userpdfId, currentpg, false));
  };

  render() {
    const { haspdfs, isFetching, userpdfId, userpdfs } = this.props;

    if (isFetching && !userpdfs.length) {
      return <p>Loading...</p>;
    }

    if (!haspdfs) {
      return null;
    }

    const selectedPdf = userpdfs.find(p => p.id === parseInt(userpdfId, 10));
    const { pdfurl, currentpg } = selectedPdf;

    return (
      <div className="PdfviewerContainer">
        <Pdfviewer
          pdfUrl={pdfurl}
          currentpg={currentpg}
          onPagechange={this.onPagechange}
        />
      </div>
    );
  }
}

PdfviewerContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  userpdfId: PropTypes.string,
  userpdfs: PropTypes.array
};

PdfviewerContainer = withPdfs(PdfviewerContainer);

export default PdfviewerContainer;
