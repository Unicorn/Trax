/** @jsx createElement **/
import { createElement, SFC, ReactNode } from 'react'
import { connect } from 'react-redux'
import { toArray } from 'horseshoes'

import { reloadTrack } from '@/controllers/trackController'
import { toggleShowBoardSearch, toggleShowFilterMenu } from '@/controllers/settingController'
import { RootState } from '@/models/app'
import { Tracks, Track } from '@/models/track'
import { ROUTES } from '@/config/routes'
import Navigation from '@/views/sections/Navigation'
import AlertsList from '@/views/ui/alert/AlertsList'
import LoadingIcon from '@/views/ui/icons/LoadingIcon'
import SearchIcon from '@/views/ui/icons/SearchIcon'
import FilterIcon from '@/views/ui/icons/FilterIcon'

interface Props {
  children: React.ReactNode
}

interface Connected {
  tracks: Tracks
  page: string
  showBoardSearch: boolean
  showFilterMenu: boolean
  issuesLoading: boolean
}

interface Actions {
  _reloadTrack: typeof reloadTrack
  _toggleShowBoardSearch: typeof toggleShowBoardSearch
  _toggleShowFilterMenu: typeof toggleShowFilterMenu
}

const Dashboard: SFC<Props & Connected & Actions> = props => {
  const {
    children,
    tracks,
    page,
    showBoardSearch,
    showFilterMenu,
    issuesLoading,
    _reloadTrack,
    _toggleShowBoardSearch,
    _toggleShowFilterMenu
  } = props

  const _reloadTracksHandler = (): void => {
    const tracksArr = toArray(tracks) as Track[]
    tracksArr.forEach(track => _reloadTrack(track))
  }

  const _renderBoardActions = (): ReactNode => [
    <button key="filter" onClick={() => _toggleShowFilterMenu(!showFilterMenu)}>
      <FilterIcon />
    </button>,
    <button key="search" onClick={() => _toggleShowBoardSearch(!showBoardSearch)}>
      <SearchIcon />
    </button>,
    <button key="loading" className={issuesLoading ? 'spin' : ''} onClick={_reloadTracksHandler}>
      <LoadingIcon />
    </button>
  ]

  return (
    <div>
      <div>
        <header className="toolbar">
          <div className="actions">{page === ROUTES.board.name && _renderBoardActions()}</div>
        </header>

        <AlertsList />

        <Navigation />
      </div>

      <main className="dashboard">{children}</main>
    </div>
  )
}

const mapState = (state: RootState): Connected => ({
  tracks: state.tracks,
  page: state.settings.page,
  showBoardSearch: state.settings.showBoardSearch,
  showFilterMenu: state.settings.showFilterMenu,
  issuesLoading: state.issues.isLoading === true
})

const mapDispatch = {
  _toggleShowBoardSearch: toggleShowBoardSearch,
  _toggleShowFilterMenu: toggleShowFilterMenu,
  _reloadTrack: reloadTrack
}

export default connect(
  mapState,
  mapDispatch
)(Dashboard)
