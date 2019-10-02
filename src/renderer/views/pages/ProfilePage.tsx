/** @jsx createElement **/
import { createElement, FC, ReactNode, useState, useEffect } from 'react'
import { connect } from 'react-redux'

import Tabbed from '@/views/ui/Tabbed'
import ProfileHelp from '@/views/help/ProfileHelp'
import RepoList from '@/views/repos/RepoList'
import RepoItem from '@/views/repos/RepoItem'
import { RootState } from '@/models/app'
import { Org, Orgs } from '@/models/org'
import { Track, Tracks } from '@/models/track'
import { getOrgs, getReposForLogin } from '@/models/github'
import { Repos } from '@/models/repo'
import { toArray } from 'horseshoes'

interface Connected {
  tracks: Tracks
  repos: Repos
  orgs: Orgs
}

interface Actions {
  _getOrgs: typeof getOrgs
  _getReposForLogin: typeof getReposForLogin
}

interface State {
  content: { [key: string]: ReactNode }
  logins: { [key: string]: string }
}

const ProfilePage: FC<Connected & Actions> = ({ tracks, repos, orgs, _getOrgs, _getReposForLogin }) => {
  const [_state, _setState] = useState<State>({ content: {}, logins: {} })

  useEffect(() => {
    _getOrgs()
  }, [])

  useEffect(() => {
    const newState: State = { ..._state }
    const orgArr = toArray(orgs) as Org[]

    orgArr.forEach((org: Org) => {
      newState.content[org.login] = <RepoList repoIds={org.repoIds} />
      newState.logins[org.login] = org.nodeId
    })

    _setState(newState)
  }, [orgs])

  const _renderTracks = (): ReactNode => {
    if (tracks.keys.length < 1) return <p>Nothing tracked yet. Select a repo to track.</p>

    const activeTracks = (toArray(tracks) as Track[]).filter(track => track.active)

    return (
      <ul>
        {activeTracks.map(track => (
          <RepoItem repo={repos.data[track.repoId]} key={track.key} />
        ))}
      </ul>
    )
  }

  const _tabHandler = (login: string): void => {
    const { logins } = _state as State
    const key: string = logins[login]
    _getReposForLogin(login, key)
  }

  return (
    <section className="profile page">
      <ProfileHelp />

      <div className="columns golden-ratio">
        <div className="left column">
          <div className="scroll">
            <h2>Tracked Repositories</h2>
            {_renderTracks()}
          </div>
        </div>
        <div className="right column">
          <Tabbed content={_state.content} tabHandler={_tabHandler} />
        </div>
      </div>
    </section>
  )
}

const mapState = (state: RootState): Connected => ({
  tracks: state.tracks,
  repos: state.repos,
  orgs: state.orgs
})

const mapDispatch = {
  _getOrgs: getOrgs,
  _getReposForLogin: getReposForLogin
}

export default connect(
  mapState,
  mapDispatch
)(ProfilePage)
