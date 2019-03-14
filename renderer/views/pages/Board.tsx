import { keys, trim } from 'lodash'
import * as React from 'react'
import { connect } from 'react-redux'

import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { issuesList, switchLanes } from 'controllers/issueController'
import { TRACK, Tracks } from 'models/track'
import { Issues, Issue } from 'models/issue'
import { issuesArray, filterIssues } from 'helpers/issueHelper'
import Lane from 'views/issues/Lane'
import SearchIssues from 'views/issues/SearchIssues'
import { Lane as TLane } from 'config/constants'

interface Connected {
  lanes: TLane[]
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

    keys(tracks).forEach(key => {
      dispatch({ type: TRACK.RELOAD })
      dispatch(issuesList.request(tracks[key].ident))
    })
  }

  componentWillReceiveProps(props: Connected) {
    this.setState({ issuesArr: issuesArray(props.issues) })
  }

  _filterIssues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const issuesArr = issuesArray(this.props.issues)
    const text = trim(e.target.value)

    if (text.length === 0)
      this.setState({ issuesArr })
    else
      this.setState({ issuesArr: filterIssues(text, issuesArr) })
  }

  _onDragEnd = (result: DropResult) => {
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
    const { lanes } = this.props
    const { issuesArr } = this.state

    return (
      <section className="board">
        <header className="search">
          <SearchIssues handler={this._filterIssues} />

          <div className="actions">
            <button className="brown basic micro button">
              Reload
            </button>
          </div>
        </header>

        <div className="columns">
          <DragDropContext onDragEnd={this._onDragEnd}>
            {lanes.map(lane => <Lane lane={lane} issues={issuesArr.filter((issue: Issue) => issue.lane === lane)} />)}
          </DragDropContext>
        </div>
      </section>
    )
  }

}

const mapState = (state: any) => ({
  tracks: state.tracks,
  issues: state.issues,
  lanes: state.settings.lanes
})

export default connect(mapState)(Board)
