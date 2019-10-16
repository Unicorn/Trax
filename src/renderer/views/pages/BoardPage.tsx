/** @jsx createElement **/
import { createElement, SFC, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { toArray } from 'horseshoes'
import { trim } from 'lodash'
import { reloadTrack } from '@/controllers/trackController'
import { RootState } from '@/models/app'
import { Tracks, Track } from '@/models/track'
import { Issues, Issue } from '@/models/issue'
import { updateIssueLane } from '@/models/github'
import { LaneTypes, visibleLanes, Lanes } from '@/models/lane'
import { Users } from '@/models/user'
import { filterIssues } from '@/helpers/issueHelper'
import IssuesLane from '@/views/issues/IssuesLane'
import SearchIssues from '@/views/issues/SearchIssues'
import FilterIssues from '@/views/issues/FilterIssues'

interface Connected {
  tracks: Tracks
  issues: Issues
  users: Users
  lanes: Lanes
  showBoardSearch: boolean
  showFilterMenu: boolean
  showBoardHelp: boolean
}

interface Actions {
  _reloadTrack: typeof reloadTrack
  _updateIssueLane: typeof updateIssueLane
}

const BoardPage: SFC<Connected & Actions> = ({
  _reloadTrack,
  tracks,
  issues,
  users,
  lanes,
  showBoardSearch,
  showFilterMenu,
  _updateIssueLane
}) => {
  const [_repo, _setRepo] = useState('')
  const [_assignee, _setAssignee] = useState('')
  const [_search, _setSearch] = useState('')
  const [_filtered, _setFiltered] = useState<readonly Issue[]>(toArray<Issue>(issues))

  const _reload = (): void => toArray<Track>(tracks).forEach(track => _reloadTrack(track))

  const _filterHandler = (): void => {
    let filtered = toArray<Issue>(issues)

    trim(_search).length > 0 ? (filtered = filterIssues(_search, filtered)) : null
    trim(_repo).length > 0 ? (filtered = filtered.filter(issue => issue.ident === _repo)) : null
    trim(_assignee).length > 0 ? (filtered = filtered.filter(issue => issue.assignees.map(a => a.login).includes(_assignee))) : null

    _setFiltered(filtered)
  }

  const _onDragEnd = (result: DropResult): void => {
    const { source, destination, draggableId } = result

    if (!destination) return

    if (source.droppableId !== destination.droppableId) {
      const issue = issues.data[draggableId]
      const lane = destination.droppableId as LaneTypes
      _updateIssueLane(issue, lane)
      _filterHandler()
    }
  }

  useEffect(() => {
    _reload()
  }, [])

  useEffect(() => {
    _filterHandler()
  }, [issues.data, _search, _repo, _assignee])

  return (
    <section className="board">
      {showBoardSearch && <SearchIssues search={_search} searchHandler={_setSearch} />}
      {showFilterMenu && (
        <FilterIssues
          repo={_repo}
          assignee={_assignee}
          tracks={tracks}
          users={users}
          repoHandler={_setRepo}
          assigneeHandler={_setAssignee}
        />
      )}
      <div className="columns">
        <DragDropContext onDragEnd={_onDragEnd}>
          {visibleLanes(lanes).map(lane => (
            <IssuesLane key={lane} lane={lane} issues={_filtered.filter((issue: Issue) => issue && issue.lane === lane)} />
          ))}
        </DragDropContext>
      </div>
    </section>
  )
}

const mapState = (state: RootState): Connected => ({
  tracks: state.tracks,
  issues: state.issues,
  users: state.users,
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
