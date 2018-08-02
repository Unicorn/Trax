import * as React from 'react'
import * as _ from 'lodash'
import { connect } from 'react-redux'

import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { requestIssues, switchLanes } from 'controllers/issueController'
import { Tracks } from 'models/track'
import { Issues, Issue } from 'models/issue'
import { issuesArray, filterIssues } from 'helpers/issueHelper'
import Lane from 'views/issues/Lane'
import SearchIssues from 'views/issues/SearchIssues'
import { SWIMLANES } from 'config/constants'

interface Connected {
  tracks: Tracks
  issues: Issues
  dispatch: (action: any) => any
}

interface State {
  issuesArr: Issue[]
}

class Board extends React.Component<Connected, State> {

  state = {
    issuesArr: []
  }

  componentWillMount() {
    const { dispatch, tracks } = this.props
    tracks.forEach(t => dispatch(requestIssues(t.ident)))
  }

  componentWillReceiveProps(props: Connected) {
    this.setState({ issuesArr: issuesArray(props.issues) })
  }

  _filterIssues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const issuesArr = issuesArray(this.props.issues)
    const text = _.trim(e.target.value)

    if (text.length === 0)
      this.setState({ issuesArr })
    else
      this.setState({ issuesArr: filterIssues(text, issuesArr) })
  }

  _onDragEnd = (result: DropResult) => {
    console.log('_onDragEnd', result)
    const { dispatch, issues: { entities } } = this.props
    const { source, destination, draggableId } = result

    if (!destination || !entities)
      return

    // If the issue changed lanes
    if (entities && source.droppableId !== destination.droppableId) {
      let issue = entities.issues[parseInt(draggableId)]
      dispatch(switchLanes(issue, source.droppableId, destination.droppableId))
    }
  }

  render() {
    const issues = this.state.issuesArr
    const backlog = issues.filter((issue: Issue) => issue.lane === SWIMLANES.backlog.name)
    const started = issues.filter((issue: Issue) => issue.lane === SWIMLANES.started.name)
    const review = issues.filter((issue: Issue) => issue.lane === SWIMLANES.review.name)
    const complete = issues.filter((issue: Issue) => issue.lane === SWIMLANES.complete.name)

    return (
      <div>
        <header className="search">
          <SearchIssues handler={this._filterIssues} />

          <div className="actions">
            <button className="brown basic micro button">
              Reload
            </button>
          </div>
        </header>
        <DragDropContext onDragEnd={this._onDragEnd}>
          <Lane lane={SWIMLANES.backlog.name} issues={backlog} />
          <Lane lane={SWIMLANES.started.name} issues={started} />
          <Lane lane={SWIMLANES.review.name} issues={review} />
          <Lane lane={SWIMLANES.complete.name} issues={complete} />
        </DragDropContext>
      </div>
    )
  }

}

const mapState = (state: any) => ({
  tracks: state.tracks,
  issues: state.issues,
})

export default connect(mapState)(Board)
