/** @jsx createElement **/
import { createElement, SFC } from 'react'
import { Droppable, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd'
import Card from '@/views/issues/Card'
import { Issue } from '@/models/issue'
import { totalPoints } from '@/helpers/issueHelper'

interface Props {
  issues: Issue[]
  lane: string
}

const renderIssues = (issues: Issue[], lane: string) => {
  if (issues.length < 1) return <p>No issues</p>

  return issues.map((issue, index) => <Card key={issue.key} issue={issue} lane={lane} index={index} />)
}

const IssuesLane: SFC<Props> = ({ lane, issues }) => {
  return (
    <Droppable droppableId={lane}>
      {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
        <div className={`swimlane ${lane} ${snapshot.isDraggingOver && 'dragging-over'}`} ref={provided.innerRef}>
          <big>
            <b>{lane}</b> <i>{totalPoints(issues)}</i>
          </big>
          <div className="inner">{renderIssues(issues, lane)}</div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default IssuesLane
