/** @jsx createElement **/
import { createElement, Component } from 'react'
import { connect } from 'react-redux'

import Tabbed from '@/views/ui/Tabbed'
import ProfileHelp from '@/views/help/ProfileHelp'
import RepoList from '@/views/repos/RepoList'
import RepoItem from '@/views/repos/RepoItem'
import { AppState, toArray, Resources } from '@/models/app'
import { Org } from '@/models/org'
import { Track } from '@/models/track'
import { getOrgs, getReposForLogin } from '@/models/github'

interface Connected {
  tracks: Resources
  repos: Resources
  orgs: Resources
  dispatch: (action: any) => any
}

interface State {
  content: { [key: string]: any }
  logins: { [key: string]: string }
}

class ProfilePage extends Component<Connected, State> {
  state = {
    content: {},
    logins: {}
  }

  componentWillMount() {
    this.props.dispatch(getOrgs())
  }

  componentWillReceiveProps(props: Connected) {
    const newState: State = { ...this.state }
    const orgArr = toArray(props.orgs) as Org[]

    orgArr.forEach((org: any) => {
      newState.content[org.login] = <RepoList repoIds={org.repoIds} />
      newState.logins[org.login] = org.nodeId
    })

    this.setState(newState)
  }

  _renderTracks = () => {
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

  _tabHandler = (login: string, _: number) => {
    const { logins } = this.state as State
    const key: string = logins[login]
    this.props.dispatch(getReposForLogin(login, key))
  }

  render() {
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

const mapState = (state: AppState) => ({
  tracks: state.tracks,
  repos: state.repos,
  orgs: state.orgs
})

export default connect(mapState)(ProfilePage)
