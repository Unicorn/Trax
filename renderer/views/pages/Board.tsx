import * as React from 'react'
import { connect } from 'react-redux'
import Fuse from 'fuse.js'
import { DragDropContext } from 'react-beautiful-dnd'
import { requestIssues } from 'controllers/issueController'
import { Tracks } from 'models/track'
import { Issues, Issue } from 'models/issue'
import { groupByLane } from 'helpers/issueHelper'
import Lane from 'views/issues/Lane'
import { SWIMLANES } from 'config/constants'

interface Connected {
  tracks: Tracks
  issues: Issues
  dispatch: (action: any) => any
}

interface State {
  backlog?: Issue[]
  started?: Issue[]
  review?: Issue[]
  complete?: Issue[]
}

class Board extends React.Component<Connected, State> {

  state = {
    backlog: [],
    started: [],
    review: [],
    complete: [],
  }

  componentWillMount() {
    const { dispatch, tracks } = this.props

    tracks.forEach(t => dispatch(requestIssues(t.ident)))
  }

  componentWillReceiveProps() {
    const { issues } = this.props
    const grouped = groupByLane(issues)
    console.log('grouped', grouped)
    this.setState(grouped)
  }

  _onDragEnd(result: any) {
    console.log('_onDragEnd', result)
  }

  render() {
    console.log('state', this.state)
    const { backlog, started, review, complete } = this.state

    return (
      <div>
        <header className="search">
          <input
            type="text"
            placeholder="Search for tasks..."
          />

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
  issues: state.issues
})

export default connect(mapState)(Board)
