import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actions from '../actions';
import { getVisibleUserpdfs, getIsFetching } from '../reducers';
import { API_HOST } from '../api';

import UserpdfSelector from './UserpdfSelector';

import './Topbar.css';

class Topbar extends Component {

  render() {
    const LOGOUT_LINK = `${API_HOST}/user/logout`;
    return (
      <div className="Topbar">
        <div className="Topbar-title">
          Ledger Grant Data Entry
        </div>
        <UserpdfSelector />
        <div className="Topbar-userwidget">
          <span className="Topbar-username">{this.props.username}</span>
          <span>
            <a href={LOGOUT_LINK}>log out</a>
          </span>
        </div>
      </div>
    );
  }
}

Topbar.propTypes = {
  isFetchingUserpdfs: PropTypes.bool.isRequired,
  orgname: PropTypes.string,
  username: PropTypes.string,
};

const mapStateToProps = (state, { match: { params } }) => {
  const userpdfId = params.userpdf || null;
  let orgname = null;

  const userpdfs = getVisibleUserpdfs(state, 'all');
  if (
    userpdfs.find(function(p) {
      return p.id === parseInt(userpdfId, 10);
    })
  ) {
    orgname = userpdfs.find(function(p) {
      return p.id === parseInt(userpdfId, 10);
    }).org.name;
  }

  return {
    isFetchingUserpdfs: getIsFetching(state, 'all'),
    isFetchingSessioninfo: state.user.isFetching,
    userpdfId,
    orgname,
    username: state.user.name,
    userpdfs,
  };
};

const TopbarWrapped = withRouter(connect(
  mapStateToProps,
  actions
)(Topbar));

export default TopbarWrapped;
