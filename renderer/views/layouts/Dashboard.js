import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { github } from 'controllers/githubController'
import { openModal } from 'controllers/modalController'
import Navigation from 'views/sections/Navigation'
import Alerts from 'views/ui/alert/Alerts'
import Modals from 'views/ui/modal/Modals'
import CreateIssue from 'views/issues/CreateIssue'
import { ROUTES } from 'config/constants'

const select = state => ({
  auth: state.github.auth.data,
  user: state.github.profile.data,
})

class Dashboard extends React.Component {
  componentWillMount = () => this.props.dispatch(github.profile())

  _showCreateIssue = e => {
    const { user, dispatch } = this.props

    e.preventDefault()

    dispatch(
      openModal({
        title: 'Create Issue',
        children: <CreateIssue initialValues={{ assignee: user.login }} />,
      })
    )
  }

  render = () => {
    const { auth, route } = this.props

    if (auth.loggedIn)
      return (
        <div>
          <Modals />
          <Alerts />

          <div>
            <header className="toolbar">
              <div className="actions">
                <button
                  className="basic micro button"
                  onClick={this._showCreateIssue}
                >
                  Create Issue
                </button>
              </div>
            </header>

            <Navigation />
          </div>

          <main className="dashboard">{renderRoutes(route.routes)}</main>
        </div>
      )
    else return <Redirect to={ROUTES.welcome.path} />
  }
}

export default connect(select)(Dashboard)
