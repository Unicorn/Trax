import { union, trim } from 'lodash'
import * as React from 'react'
import { connect } from 'react-redux'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

import { AppState, toArray } from 'models/app'
import { issuesArray, filterIssues } from 'helpers/issueHelper'
import { reloadTrack } from 'controllers/trackController'
import { Tracks, Track } from 'models/track'
import { Issues, Issue } from 'models/issue'
import { Lane as TLane } from 'config/constants'

import Lane from 'views/issues/Lane'
import SearchIssues from 'views/issues/SearchIssues'

interface Connected {
  tracks: Tracks
  issues: Issues
  lanes: TLane[]
  dispatch: (action: any) => any
}

interface State {
  allIssues: Issue[]
  filteredIssues: Issue[]
}

class BoardPage extends React.Component<Connected, State> {

  state = {
    allIssues: [],
    filteredIssues: []
  }

  componentWillMount() {
    const { dispatch, tracks } = this.props
    const tracksArr = toArray(tracks) as Track[]
    tracksArr.forEach(track => dispatch(reloadTrack(track)))
  }

  componentWillReceiveProps(props: Connected) {
    const newState: State = { ...this.state }
    let issueIds: string[] = []

    const tracksArr = toArray(props.tracks) as Track[]
    tracksArr.forEach(track => issueIds = union(issueIds, track.issueIds))
    newState.filteredIssues = union(newState.filteredIssues, issueIds.map(id => props.issues.data[id]))
    newState.allIssues = newState.filteredIssues

    console.log("newState", tracksArr, newState)

    this.setState(newState)
  }

  _filterIssues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { allIssues } = this.state
    const text = trim(e.target.value)

    if (text.length === 0)
      this.setState({ filteredIssues: allIssues })
    else
      this.setState({ filteredIssues: filterIssues(text, allIssues) })
  }

  _onDragEnd = (result: DropResult) => {
    const { dispatch, issues } = this.props
    const { source, destination, draggableId } = result

    if (!destination)
      return

    // If the issue changed lanes
    if (source.droppableId !== destination.droppableId) {
      let issue = issues.data[draggableId]
      console.log("switchLanes", source.droppableId, destination.droppableId)
      // dispatch(switchLanes(issue, source.droppableId, destination.droppableId))
    }
  }

  render() {
    const { lanes } = this.props
    const { filteredIssues } = this.state

    console.log("filteredIssues", filteredIssues)

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
            {lanes.map(lane => (
              <Lane
                key={lane}
                lane={lane}
                issues={filteredIssues.filter((issue: Issue) => issue.lane === lane)}
              />
            ))}
          </DragDropContext>
        </div>
      </section>
    )
  }

}

const mapState = (state: AppState) => ({
  tracks: state.tracks,
  issues: state.issues,
  lanes: state.settings.lanes
})

export default connect(mapState)(BoardPage)
