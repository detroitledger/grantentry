import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './App.css';

import * as actions from './actions';
//import PdfviewerContainer from './components/PdfviewerContainer';
//import Addgrantframe from './components/Addgrantframe';
//import Topbar from './components/Topbar';
//import Tour from './containers/Tour';

export class UnwrappedApp extends Component {
  componentDidMount() {
    this.props.getUserWithSavedToken();
  }

  static propTypes = {
    isFetchingUser: PropTypes.bool.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    gooUser: PropTypes.object,
    errorAuth: PropTypes.object,
    isFetchingAuth: PropTypes.object,
    getUserWithSavedToken: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    callGoogleAuthEndpoint: PropTypes.func.isRequired,
    fetchUserpdfs: PropTypes.func.isRequired,
    fetchCurrentUser: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
  };

  authInProgress = () => (
    <div>
      <button className="bigmessage">
        Authenticating...
      </button>
    </div>
  );

  loginPrompt = () => (
    <div>
      <button className="bigmessage" onClick={this.props.login}>
        Log in to start entering grants
        {this.props.errorAuth &&
          <div>Auth error: {this.props.errorAuth}</div>
        }
      </button>
    </div>
  );

  render() {
    if (this.props.isFetchingAuth) return this.authInProgress();

    // new homepage
    if (!this.props.gooUser) {
      return this.loginPrompt();
    } else {
      return (
        <div className="App">
          <header className="Topbar-container">
            TODO: Topbar
            <button onClick={this.props.logout}>Log out</button>
          </header>
          <main className="wrapper">
            <div className="Pdfviewer-container" role="complementary">
              TODO: PdfviewerContainer
            </div>
            <div className="Addgrantframe-container" role="main">
              TODO: Addgrantframe
              <div>{JSON.stringify(this.props.gooUser)}</div>
              <div>
                <button onClick={this.props.callGoogleAuthEndpoint.bind(this, 'getGoogleUser')}>hi</button>
              </div>
            </div>
          </main>
        </div>
      );
    }
  }
}

export default connect(
  ({ user, auth }) => ({
    loggedIn: user.id !== null,
    isFetchingUser: user.isFetching,
    errorAuth: auth.error,
    isFetchingAuth: auth.isFetching,
    gooUser: auth.user,
  }),
  actions
)(UnwrappedApp);
