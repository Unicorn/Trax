/** @jsx createElement **/
import { createElement, SFC } from 'react'
import { connect } from 'react-redux'
import { logout } from '@/controllers/githubController'
import { resetApp } from '@/models/app'

interface Actions {
  _resetApp: typeof resetApp
  _logout: typeof logout
}

const AppSettings: SFC<Actions> = ({ _logout, _resetApp }) => {
  return (
    <div className="fixed box bottom">
      <p>Current Version: {window.app.version}</p>
      <button className="small yellow button" onClick={_logout}>
        Logout
      </button>
      <button className="small red button" onClick={_resetApp}>
        Reset Application Data
      </button>
    </div>
  )
}

const mapDispatch: Actions = {
  _resetApp: resetApp,
  _logout: logout
}

export default connect(
  null,
  mapDispatch
)(AppSettings)
