import * as React from 'react'
import { connect } from 'react-redux'
import { requestOrgs } from 'controllers/orgController'
import { Org } from 'models/org'

interface State {
  selected: string
}

interface Connected {
  orgs: Org[]
  dispatch: (action: any) => any
}

class ProfileNav extends React.Component<Connected, State> {

  state = {
    selected: 'personal'
  }

  componentWillMount() {
    const { orgs, dispatch } = this.props

    if (orgs.length === 0)
      dispatch(requestOrgs())
  }

  _handleTabClick(e: any, login: string) {
    e.preventDefault()
    this.setState({ selected: login})
  }

  _renderOrgTab(login: string) {
    const { selected } = this.state

    return (
      <button onClick={(e: any) => this._handleTabClick(e, login)} className={selected === login ? 'active' : ''}>
        <span>{login}</span>
      </button>
    )
  }

  render() {
    const { orgs } = this.props

    return (
      <div className="tabbed">
        <nav className="controls">
          <div className="tabs">
            {orgs.map((o: Org) => this._renderOrgTab(o.login))}
            <div className="actions">
              <button className="basic red button">
                Remove All
              </button>
            </div>
          </div>
        </nav>
        <div className="pane">

        </div>
      </div>
    )
  }

}

const mapState = (state: any) => ({
  orgs: state.orgs
})

export default connect(mapState)(ProfileNav)
