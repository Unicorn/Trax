import * as React from 'react'
import { Droppable, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd'
import Card from 'views/issues/Card'
import { Issue } from 'models/issue'

interface Props {
  issues: Issue[]
  lane: string
}

const renderIssues = (issues: Issue[], lane: string) => {
  if (issues.length < 1)
    return <p>No issues</p>

  return issues.map((issue, index) => (
    <Card
      key={issue.id}
      issue={issue}
      lane={lane}
      index={index}
    />
  ))
}

const IssuesLan: React.SFC<Props> = ({ lane, issues }) => {
  return (
    <Droppable droppableId={lane}>
      {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
        <div className={`swimlane ${lane} ${snapshot.isDraggingOver && 'dragging-over'}`} ref={provided.innerRef}>
          <big>{lane}</big>
          <div className="inner">
            {renderIssues(issues, lane)}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default IssuesLan
