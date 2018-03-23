import React from 'react'
import IssueItem from 'views/issues/IssueItem'

const IssueList = ({ issues }) => {
  return (
    <div className="inner">
      {issues.map(issue => <IssueItem key={issue.id} issue={issue} />)}
    </div>
  )
}

export default IssueList
