import * as React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import Card from 'views/issues/Card'
import { Issue } from 'models/issue'

interface Props {
  issues: Issue[]
  lane: string
}

const renderIssues = (issues: Issue[], lane: string, provided: any, snapshot: any) => {
  if (issues.length < 1)
    return <p>No issues</p>

  return issues.map((issue, index) => (
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

const Lane: React.SFC<Props> = ({ lane, issues }) => {
  return (
    <Droppable droppableId={lane}>
      {(provided, snapshot) => (
        <div className={`swimlane ${lane} ${snapshot.isDraggingOver && 'dragging-over'}`} ref={provided.innerRef}>
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
