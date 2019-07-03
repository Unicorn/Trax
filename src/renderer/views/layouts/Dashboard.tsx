/** @jsx createElement **/
import { createElement, SFC, ReactNode } from 'react'
import { connect } from 'react-redux'

import { reloadTrack } from '@/controllers/trackController'
import { toggleShowBoardSearch } from '@/controllers/settingController'
import { RootState } from '@/models/app'
import { Tracks, Track } from '@/models/track'
import { ROUTES } from '@/config/constants'
import Navigation from '@/views/sections/Navigation'
import AlertsList from '@/views/ui/alert/AlertsList'
import LoadingIcon from '@/views/ui/icons/LoadingIcon'
import SearchIcon from '@/views/ui/icons/SearchIcon'
import { toArray } from 'horseshoes'

interface Props {
  children: React.ReactNode
}

interface Connected {
  tracks: Tracks
  page: string
  showBoardSearch: boolean
  issuesLoading: boolean
}

interface Actions {
  _reloadTrack: typeof reloadTrack
  _toggleShowBoardSearch: typeof toggleShowBoardSearch
}

const Dashboard: SFC<Props & Connected & Actions> = props => {
  const { children, tracks, page, showBoardSearch, issuesLoading, _reloadTrack, _toggleShowBoardSearch } = props

  const _reloadTracksHandler = (): void => {
    const tracksArr = toArray(tracks) as Track[]
    tracksArr.forEach(track => _reloadTrack(track))
  }

  const _renderBoardActions = (): ReactNode => [
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
  issuesLoading: state.issues.isLoading === true
})

const mapDispatch = {
  _toggleShowBoardSearch: toggleShowBoardSearch,
  _reloadTrack: reloadTrack
}

export default connect(
  mapState,
  mapDispatch
)(Dashboard)
