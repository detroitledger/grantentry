import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

import PdfviewerContainer from './components/PdfviewerContainer';
import Addgrantframe from './components/Addgrantframe';
import Topbar from './components/Topbar';
import Bottombar from './components/Bottombar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="Topbar-container">
          <Topbar/>
        </header>
        <main className="wrapper">
          <div className="Pdfviewer-container" role="complementary">
            <PdfviewerContainer />
          </div>
          <div className="Addgrantframe-container" role="main">
            <Addgrantframe />
          </div>
        </main>
        <footer className="Bottombar-container">
          <Bottombar/>
        </footer>
      </div>
    );
  }
}

App.propTypes = {
  params: PropTypes.shape({
    userpdf: PropTypes.string,
  }),
};

export default App;
