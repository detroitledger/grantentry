import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actions from '../actions';

import { getVisibleUserpdfs, getIsFetching } from '../reducers';

import { API_HOST } from '../api';

import './Addgrantframe.css';

class Addgrantframe extends Component {
  render() {
    const { isFetching, userpdfId, userpdfs } = this.props;

    if (isFetching && !userpdfs.length) {
      return <p>Loading...</p>;
    }

    if (!userpdfs.length || !userpdfId || !userpdfs.find(p => p.id === parseInt(userpdfId, 10))) {
      return <p>Please specify a pdf in your todo list.</p>;
    }

    const selectedPdf = userpdfs.find(p => p.id === parseInt(userpdfId, 10));
    const orgNameAndId = `${selectedPdf.org.name} (${selectedPdf.org.id})`;
    const toYear = selectedPdf.year + 1;

    const iframeSrc = `${API_HOST}/node/add/grant?edit[field_year][und][0][value][date]=01/${selectedPdf.year}&edit[field_year][und][0][value2][date]=01/${toYear}&edit[field_funder][und][0][target_id]=${orgNameAndId}`;

    return (
      <div className="Addgrantframe">
        <iframe title="add grant" src={iframeSrc}/>
      </div>
    );
  }
}

Addgrantframe.propTypes = {
  userpdfId: PropTypes.string,
  userpdfs: PropTypes.array,
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, { match: { params } }) => {
  const userpdfId = params.userpdf || null;

  return {
    isFetching: getIsFetching(state, 'all'),
    userpdfId,
    userpdfs: getVisibleUserpdfs(state, 'all'),
  };
};

Addgrantframe = withRouter(connect(
  mapStateToProps,
  actions
)(Addgrantframe));

export default Addgrantframe;