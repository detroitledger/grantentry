import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withPdfs } from '../containers/WithPdfs';
import { API_HOST } from '../api';

import './Addgrantframe.css';

class Addgrantframe extends Component {
  render() {
    const { haspdfs, isFetching, userpdfId, userpdfs } = this.props;

    if (isFetching && !userpdfs.length) {
      return <p>Loading...</p>;
    }

    if (!haspdfs) {
      return <p>Please select a PDF from your todo list below.</p>;
    }

    const selectedPdf = userpdfs.find(p => p.id === parseInt(userpdfId, 10));
    const orgNameAndId = `${selectedPdf.org.name} (${selectedPdf.org.id})`;
    const toYear = selectedPdf.year + 1;

    const iframeSrc = `${API_HOST}/node/add/grant?edit[field_year][und][0][value][date]=01/${selectedPdf.year}&edit[field_year][und][0][value2][date]=01/${toYear}&edit[field_funder][und][0][target_id]=${orgNameAndId}`;

    return (
      <div className="Addgrantframe">
        <iframe title="add grant" src={iframeSrc} />
      </div>
    );
  }
}

Addgrantframe.propTypes = {
  haspdfs: PropTypes.bool,
  userpdfId: PropTypes.string,  
  userpdfs: PropTypes.array,
  isFetching: PropTypes.bool.isRequired
};

Addgrantframe = withPdfs(Addgrantframe);

export default Addgrantframe;