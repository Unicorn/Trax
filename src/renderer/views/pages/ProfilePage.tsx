/** @jsx createElement **/
import { createElement, Component, ReactNode } from 'react'
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

class ProfilePage extends Component<Connected & Actions, State> {
  state = {
    content: {},
    logins: {}
  }

  componentWillMount(): void {
    this.props._getOrgs()
  }

  componentWillReceiveProps(props: Connected): void {
    const newState: State = { ...this.state }
    const orgArr = toArray(props.orgs) as Org[]

    orgArr.forEach((org: Org) => {
      newState.content[org.login] = <RepoList repoIds={org.repoIds} />
      newState.logins[org.login] = org.nodeId
    })

    this.setState(newState)
  }

  _renderTracks = (): ReactNode => {
    const { tracks, repos }: Connected = this.props

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

  _tabHandler = (login: string): void => {
    const { logins } = this.state as State
    const key: string = logins[login]
    this.props._getReposForLogin(login, key)
  }

  render(): ReactNode {
    return (
      <section className="profile page">
        <ProfileHelp />

        <div className="columns golden-ratio">
          <div className="left column">
            <div className="scroll">
              <h2>Tracked Repositories</h2>
              {this._renderTracks()}
            </div>
          </div>
          <div className="right column">
            <Tabbed content={this.state.content} tabHandler={this._tabHandler} />
          </div>
        </div>
      </section>
    )
  }
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
