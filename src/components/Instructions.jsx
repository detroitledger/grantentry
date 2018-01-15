import React from 'react';

const Instructions = () => (
  <div style={{ margin: '2em', lineHeight: '1.5em' }}>
    <h1 style={{ marginBottom: '1em' }}>How to enter data with the Detroit Ledger</h1>
    <h2>Overview</h2>
    <p>The goal is to capture philanthropic giving that has an impact on Detroit.</p>
    <p>Here’s what counts as Detroit impact:</p>
    <ul>
      <li>by <b>address</b>: the organization that is receiving funds is located in Detroit</li>
      <li>by <b>mission</b>: the organization has a mission focused on impacting Detroit, even though it is located elsewhere (such as Some Organization located in Livonia, MI)</li>
      <li>by <b>grant description</b>: the organization is involved in a project that will impact Detroit (though the organization may be based elsewhere)</li>
    </ul>
    <p>Two types of records are created in order to capture giving interactions, <b>grant records</b> and <b>organization records</b>.</p>
    <br />
    <h2>Getting started</h2>
    <ol>
      <li>Pick a 990 above; the 990 PDF will show up to the left and a grant entry form will show up to the right</li>
      <li>Double check that the funder name and fiscal year on the first page of the 990 match what is auto-populated in the grant entry form</li>
      <li>Scroll through the 990 until you find the grants schedule, it's usually titled "Schedule I: Grants and Other Assistance to Organizations, Governments and Individuals in the U.S." It looks a little different for every organization, 
        sometimes it's just a list or sometimes it's a formatted table. You might have to rotate the page to read it</li>
      <li>Start entering grants using the "Detroit impact" criteria listed above. Each grant needs a: 
        <ul>
          <li>Start and end date</li>
          <li>Funder</li>
          <li>Recipient</li>
          <li>Source</li>
          <li>Amount</li>
          <li>Description</li>
        </ul>
      </li>
      <li>Repeat until you have entered all grant records relevant to Detroit in your assigned 990</li>
      <li>Click the checkbox above to mark this 990 as "done". If you quit before you are done, we'll save your current page until next time</li>
    </ol>
    <br />
    <p>Still have questions? Find the in-depth guide to data entry <a href="https://docs.google.com/document/d/1wYjWxWi2OXLjTN6XDR4aQYO4B3rkqB6uvArdGCSeEAI/edit?usp=sharing">here.</a></p>
  </div>
);

export default Instructions;
