/** @jsx createElement **/
import { createElement, FC, useState, useEffect } from 'react'
import { union, trim } from 'lodash'
import { connect } from 'react-redux'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { toArray } from 'horseshoes'
import { reloadTrack } from '@/controllers/trackController'
import { RootState } from '@/models/app'
import { Tracks, Track } from '@/models/track'
import { Issues, Issue } from '@/models/issue'
import { updateIssueLane } from '@/models/github'
import { LaneTypes, visibleLanes, Lanes } from '@/models/lane'
import { filterIssues } from '@/helpers/issueHelper'
import IssuesLane from '@/views/issues/IssuesLane'
import SearchIssues from '@/views/issues/SearchIssues'
import FilterIssues from '@/views/issues/FilterIssues'

interface Connected {
  tracks: Tracks
  issues: Issues
  lanes: Lanes
  showBoardSearch: boolean
  showFilterMenu: boolean
  showBoardHelp: boolean
}

interface Actions {
  _reloadTrack: typeof reloadTrack
  _updateIssueLane: typeof updateIssueLane
}

const _tracksArray = (tracks: Tracks): Track[] => {
  return toArray(tracks) as Track[]
}

const BoardPage: FC<Connected & Actions> = ({ _reloadTrack, tracks, issues, lanes, showBoardSearch, showFilterMenu, _updateIssueLane }) => {
  const [allIssues, setAllIssues] = useState<Issue[]>([])
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>([])

  const _reload = (): void => {
    const tracksArray = _tracksArray(tracks)

    tracksArray.forEach(track => _reloadTrack(track))
  }

  const _filterIssues = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const text = trim(e.target.value)
    setFilteredIssues(text.length === 0 ? allIssues : filterIssues(text, allIssues))
  }

  const _repoSelectHandler = (ident: string): void => {
    if (ident.length < 5) {
      setFilteredIssues(allIssues)
      return
    }

    setFilteredIssues(allIssues.filter(issue => issue.ident === ident))
  }

  const _onDragEnd = (result: DropResult): void => {
    const { source, destination, draggableId } = result

    if (!destination) return

    if (source.droppableId !== destination.droppableId) {
      const issue = issues.data[draggableId]
      _updateIssueLane(issue, destination.droppableId as LaneTypes)
    }
  }

  useEffect(() => {
    _reload()
  }, ['tracks'])

  useEffect(() => {
    let issueIds: string[] = []

    const tracksArray = _tracksArray(tracks)
    tracksArray.forEach(track => (issueIds = union(issueIds, track.issueIds)))

    setFilteredIssues(union(filteredIssues, issueIds.map(id => issues.data[id])))
    setAllIssues(filteredIssues)
  }, [tracks])

  return (
    <section className="board">
      {showBoardSearch && <SearchIssues handler={_filterIssues} />}
      {showFilterMenu && <FilterIssues tracks={tracks} repoSelectHandler={_repoSelectHandler} />}
      <div className="columns">
        <DragDropContext onDragEnd={_onDragEnd}>
          {visibleLanes(lanes).map(lane => (
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

const mapState = (state: RootState): Connected => ({
  tracks: state.tracks,
  issues: state.issues,
  lanes: state.lanes,
  showBoardSearch: state.settings.showBoardSearch,
  showFilterMenu: state.settings.showFilterMenu,
  showBoardHelp: state.settings.showBoardHelp
})

const mapDispatch: Actions = {
  _reloadTrack: reloadTrack,
  _updateIssueLane: updateIssueLane
}

export default connect(
  mapState,
  mapDispatch
)(BoardPage)
