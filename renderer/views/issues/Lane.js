import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import Card from 'views/issues/Card'

const renderIssues = (issues, lane, provided, snapshot) => {
  var filtered = []
  const filterCriteria = ['started', 'review', 'complete']

  if (lane === 'backlog')
    filtered = issues.filter(
      i => i.labels.filter(l => filterCriteria.includes(l.name)).length === 0
    )
  else
    filtered = issues.filter(
      i => i.labels.filter(l => lane === l.name).length > 0
    )

  if (issues.length < 1 || filtered.length < 1) return <p>No issues</p>

  return filtered.map((issue, index) => (
    <Card
      key={issue.id}
      issue={issue}
      lane={lane}
      index={index}
      snapshot={snapshot}
      provided={provided}
    />
  ))
}

const Lane = ({ lane, issues }) => {
  return (
    <Droppable droppableId={lane}>
      {(provided, snapshot) => (
        <div
          className={`swimlane ${lane} ${snapshot.isDraggingOver &&
            'dragging-over'}`}
          ref={provided.innerRef}
        >
          <big>{lane}</big>
          <div className="inner">
            {renderIssues(issues, lane, provided, snapshot)}
          </div>
        </div>
      )}
    </Droppable>
  )
}

export default Lane
