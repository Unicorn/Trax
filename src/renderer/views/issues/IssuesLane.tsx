/** @jsx createElement **/
import { createElement, SFC, ReactNode } from 'react'
import { connect } from 'react-redux'
import { Droppable, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd'
import { setCollapsed } from '@/controllers/laneController'
import { RootState } from '@/models/app'
import { Issue } from '@/models/issue'
import { LaneTypes, Lanes } from '@/models/lane'
import { totalPoints } from '@/helpers/issueHelper'
import Card from '@/views/issues/Card'

interface Props {
  issues: Issue[]
  lane: LaneTypes
}

interface Connected {
  lanes: Lanes
}

interface Actions {
  _setCollapsed: typeof setCollapsed
}

const renderIssues = (issues: Issue[], lane: string): ReactNode => {
  if (issues.length < 1) return <p>No issues</p>

  return issues.map((issue, index) => <Card key={issue.key} issue={issue} lane={lane} index={index} />)
}

const IssuesLane: SFC<Props & Connected & Actions> = ({ lanes, lane, issues, _setCollapsed }) => {
  const settings = lanes[lane]
  const classNames = ['swimlane', lane]

  if (settings.collapsed) classNames.push('collapsed')

  return (
    <Droppable droppableId={lane}>
      {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
        <div className={`${classNames.join(' ')} ${snapshot.isDraggingOver ? 'dragging-over' : ''}`} ref={provided.innerRef}>
          <big>
            <b>
              {lane}
              <button onClick={() => _setCollapsed(lane, !settings.collapsed)}>{settings.collapsed ? '+' : '-'}</button>
            </b>
            <i>{totalPoints(issues)}</i>
          </big>
          <div className="inner">{renderIssues(issues, lane)}</div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

const mapState = (state: RootState): Connected => ({
  lanes: state.lanes
})

const mapDispatch: Actions = {
  _setCollapsed: setCollapsed
}

export default connect(
  mapState,
  mapDispatch
)(IssuesLane)
