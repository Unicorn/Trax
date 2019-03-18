import { keys } from 'lodash'
import * as React from 'react'
import { connect } from 'react-redux'

import { Tracks } from 'models'

import ProfileHelp from 'views/profile/ProfileHelp'
import ProfileNav from 'views/profile/ProfileNav'
import RepoItem from 'views/repos/RepoItem'

interface Connected {
  tracks: Tracks
  dispatch: (action: any) => any
}

const _renderTracks = (tracks: Tracks) => {
  let items = keys(tracks)

  if (items.length < 1)
    return <p>Nothing tracked yet. Select a repo to track.</p>

  return (
    <ul>
      {items.filter(key => tracks[key].active).map(key => <RepoItem repo={tracks[key].repo} key={key} />)}
    </ul>
  )
}

const ProfilePage: React.SFC<Connected> = (props) => {
  const { tracks } = props

  return (
    <section className="profile page">
      <ProfileHelp />

      <div className="columns golden-ratio">
        <div className="left column">
          <div className="scroll">
            <h2>Tracked Repositories</h2>
            {_renderTracks(tracks)}
          </div>
        </div>
        <div className="right column">
          <ProfileNav />
        </div>
      </div>
    </section>
  )
}

const mapState = (state: any) => ({
  tracks: state.tracks
})

export default connect(mapState)(ProfilePage)
