import { union, trim } from 'lodash'
import * as React from 'react'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

import { AppState, toArray } from '@/models/app'
import { filterIssues } from '@/helpers/issueHelper'
import { reloadTrack } from '@/controllers/trackController'
import { Tracks, Track } from '@/models/track'
import { Issues, Issue } from '@/models/issue'
import { updateIssueLane } from '@/models/github'
import { Lane } from '@/config/constants'

import IssuesLane from '@/views/issues/IssuesLane'
import SearchIssues from '@/views/issues/SearchIssues'

interface Connected {
  tracks: Tracks
  issues: Issues
  lanes: Lane[]
  showBoardSearch: boolean
  showBoardHelp: boolean
  dispatch: (action: any) => any
}

const BoardPage: React.FunctionComponent<Connected> = (props: Connected) => {
  const [ allIssues, setAllIssues ] = useState<Issue[]>([])
  const [ filteredIssues, setFilteredIssues ] = useState<Issue[]>([])

  function _tracksArray(tracks: Tracks) {
    return toArray(tracks) as Track[]
  }

  function _reload() {
    const { dispatch, tracks } = props
    const tracksArray = _tracksArray(tracks)

    tracksArray.forEach(track => dispatch(reloadTrack( track )))
  }

  function _filterIssues(e: React.ChangeEvent<HTMLInputElement>) {
    const text = trim(e.target.value)
    setFilteredIssues(text.length === 0 ? allIssues : filterIssues(text, allIssues))
  }

  function _onDragEnd(result: DropResult) {
    const { dispatch, issues } = props
    const { source, destination, draggableId } = result

    if (!destination) return

    if (source.droppableId !== destination.droppableId) {
      let issue = issues.data[draggableId]
      dispatch(updateIssueLane(issue, destination.droppableId as Lane))
    }
  }

  useEffect(() => {
    _reload()
  }, [])

  useEffect(() => {
    let issueIds: string[] = []

    const tracksArray = _tracksArray( props.tracks )
    tracksArray.forEach( track => issueIds = union(issueIds, track.issueIds) )

    setFilteredIssues(union(filteredIssues, issueIds.map( id => props.issues.data[id])))
    setAllIssues(filteredIssues)
  }, [props])

  const {
    lanes, showBoardSearch
  } = props

  return (

    <section className="board">
      { showBoardSearch && <SearchIssues handler={ _filterIssues }/> }
      <div className="columns">
        <DragDropContext onDragEnd={ _onDragEnd }>
          {lanes.map(lane => (
            <IssuesLane
              key={lane}
              lane={lane}
              issues={filteredIssues.filter((issue: Issue) => issue && issue.lane === lane)}
            />
          ))}
        </DragDropContext>
      </div>
    </section>
  )
}

const mapState = (state: AppState) => ({
  tracks: state.tracks,
  issues: state.issues,
  lanes: state.settings.lanes,
  showBoardSearch: state.settings.showBoardSearch,
  showBoardHelp: state.settings.showBoardHelp
})

export default connect(mapState)(BoardPage)
