import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actions from '../actions';

import { getVisibleUserpdfs, getIsFetching } from '../reducers';

import Pdfviewer from './Pdfviewer';

class PdfviewerContainer extends Component {
  onPagechange = (currentpg) => {
    this.props.updateUserpdf(this.props.userpdfId, currentpg, false);
  }

  render() {
    const { isFetching, userpdfId, userpdfs } = this.props;

    if (isFetching && !userpdfs.length) {
      return <p>Loading...</p>;
    }

    if (!userpdfs.length || !userpdfId || !userpdfs.find(p => p.id === parseInt(userpdfId, 10))) {
      return <p>Please specify a pdf in your todo list.</p>;
    }

    const selectedPdf = userpdfs.find(p => p.id === parseInt(userpdfId, 10));
    const { pdfurl, currentpg } = selectedPdf;

    return (
      <div className="PdfviewerContainer">
        <Pdfviewer pdfUrl={pdfurl} currentpg={currentpg} onPagechange={this.onPagechange} />
      </div>
    );
  }
}

PdfviewerContainer.propTypes = {
  userpdfId: PropTypes.string,
  userpdfs: PropTypes.array,
  isFetching: PropTypes.bool.isRequired,
  updateUserpdf: PropTypes.func.isRequired,
};

const mapStateToProps = (state, { match: { params } }) => {
  const userpdfId = params.userpdf || null;

  return {
    isFetching: getIsFetching(state, 'all'),
    userpdfId,
    userpdfs: getVisibleUserpdfs(state, 'all'),
  };
};

PdfviewerContainer = withRouter(connect(
  mapStateToProps,
  actions
)(PdfviewerContainer));

export default PdfviewerContainer;