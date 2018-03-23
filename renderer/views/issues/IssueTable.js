import React from 'react'
import IssueRow from 'views/issues/IssueRow'

const IssueTable = ({ issues, selectHandler, selected }) => (
  <table className="fluid formatted striped" cellPadding="0" cellSpacing="0">
    <thead>
      <tr>
        <th>
          <div className="input checkbox">
            <input
              type="checkbox"
              checked={selected}
              onChange={selectHandler}
            />
          </div>
        </th>
        <th>Repo</th>
        <th>Issue</th>
        <th>Dates</th>
        <th>Hours</th>
        <th>Invoiced?</th>
      </tr>
    </thead>
    <tbody>
      {issues.map(issue => <IssueRow key={issue.id} issue={issue} />)}
    </tbody>
  </table>
)

export default IssueTable
