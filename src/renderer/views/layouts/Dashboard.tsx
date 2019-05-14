import * as React from 'react'
import { connect } from 'react-redux'

import { logout } from '@/controllers/authController'
import { reloadTrack } from '@/controllers/trackController'
import { toggleShowBoardSearch } from '@/controllers/settingController'
import { SettingsAction } from '@/models/setting'
import { AppState, toArray } from '@/models/app'
import { Tracks, Track, TrackAction } from '@/models/track'

import Navigation from '@/views/sections/Navigation'
import AlertsList from '@/views/ui/alert/AlertsList'
import LoadingIcon from '@/views/ui/icons/LoadingIcon'
import SearchIcon from '@/views/ui/icons/SearchIcon'
import { ROUTES } from '@/config/constants'

interface Props {
  children: React.ReactNode
}

interface Actions {
  tracks: Tracks
  page: string
  showBoardSearch: boolean
  issuesLoading: boolean
  reloadTrack: (payload: Track) => TrackAction
  toggleShowBoardSearch: (value: boolean) => SettingsAction
}

const Dashboard: React.SFC<Props & Actions> = (props) => {

  const { children, tracks, page, showBoardSearch, issuesLoading, reloadTrack, toggleShowBoardSearch } = props

  const _reloadTracks = () => {
    const tracksArr = toArray(tracks) as Track[]
    tracksArr.forEach(track => reloadTrack(track))
  }

  const _renderBoardActions = () => [
    <button key="search" onClick={() => toggleShowBoardSearch(!showBoardSearch)}><SearchIcon /></button>,
    <button key="loading" className={issuesLoading ? 'spin' : ''} onClick={_reloadTracks}><LoadingIcon /></button>
  ]

  return (
    <div>
      <div>
        <header className="toolbar">
          <div className="actions">
            {page === ROUTES.board.name && _renderBoardActions()}
          </div>
        </header>

        <AlertsList />

        <Navigation />
      </div>

      <main className="dashboard">
        {children}
      </main>
    </div>
  )
}

const mapState = (state: AppState) => ({
  tracks: state.tracks,
  page: state.settings.page,
  showBoardSearch: state.settings.showBoardSearch,
  issuesLoading: state.issues.isLoading
})

const mapDispatch = ({
  toggleShowBoardSearch,
  reloadTrack,
  logout
})

export default connect(mapState, mapDispatch)(Dashboard)
