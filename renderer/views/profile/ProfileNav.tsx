import * as React from 'react'
import { connect } from 'react-redux'
import { requestOrgs } from 'controllers/orgController'
import { requestUserRepos, requestOrgRepos } from 'controllers/repoController'
import { Profile } from 'models/profile'
import { Org, Orgs } from 'models/org'
import { Repos } from 'models/repo'
import RepoList from 'views/repos/RepoList'

interface State {
  selected: {
    [key: number]: string
  }
}

interface Connected {
  profile: Profile
  orgs: Orgs
  repos: Repos
  dispatch: (action: any) => any
}

class ProfileNav extends React.Component<Connected, State> {

  state = {
    selected: {
      index: 0,
      login: 'Personal'
    },
    repos: []
  }

  componentWillMount() {
    const { profile, orgs, dispatch } = this.props

    this.setState({
      selected: {
        index: 0,
        login: profile.login
      }
    })

    dispatch(requestUserRepos())

    if (orgs.length === 0)
      dispatch(requestOrgs())
  }

  _handleTabClick(e: any, login: string, i: number) {
    const { dispatch } = this.props

    e.preventDefault()

    this.setState({
      selected: {
        index: i,
        login
      }
    })

    if (i === 0)
      dispatch(requestUserRepos())
    else
      dispatch(requestOrgRepos(login))
  }

  _renderTab(login: string, i: number) {
    const { selected } = this.state
    const className = selected.index === i ? 'active' : ''

    return (
      <button onClick={(e: any) => this._handleTabClick(e, login, i)} className={className} key={login}>
        <span>{login}</span>
      </button>
    )
  }

  render() {
    const { orgs, repos } = this.props

    return (
      <div className="tabbed">
        <nav className="controls">
          <div className="tabs">
            {this._renderTab('Personal', 0)}
            {orgs.length > 0 && orgs.map((o: Org, i: number) => this._renderTab(o.login, i + 1))}
          </div>
        </nav>
        <div className="scroll pane">
          <RepoList repos={repos} />
        </div>
      </div>
    )
  }

}

const mapState = (state: any) => ({
  profile: state.profile,
  orgs: state.orgs,
  repos: state.repos,
})

export default connect(mapState)(ProfileNav)
