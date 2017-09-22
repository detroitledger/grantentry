import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actions from '../actions';
import { getVisibleUserpdfs, getIsFetching } from '../reducers';
import { API_HOST } from '../api';

import './Topbar.css';

class Topbar extends Component {
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const { fetchUserpdfs, fetchCurrentUser } = this.props;
    fetchUserpdfs('all');
    fetchCurrentUser();
  }

  render() {
    const LOGOUT_LINK = `${API_HOST}/user/logout`;
    return (
      <div className="Topbar">
        <div className="Topbar-title">
          Ledger Data Entry: <span className="orgname">{this.props.orgname}</span>
        </div>
        <div className="Topbar-userwidget">
          <span className="Topbar-username">{this.props.username}</span>
          <a href={LOGOUT_LINK}>log out</a>
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
  if (userpdfs.find(function(p) { return p.id === parseInt(userpdfId, 10)})) {
    orgname = userpdfs.find(function(p) { return p.id === parseInt(userpdfId, 10)}).org.name;
  }

  return {
    isFetchingUserpdfs: getIsFetching(state, 'all'),
    isFetchingSessioninfo: state.user.isFetching,
    userpdfId,
    orgname,
    username: state.user.name,
  };
};

Topbar = withRouter(connect(
  mapStateToProps,
  actions
)(Topbar));

export default Topbar;
