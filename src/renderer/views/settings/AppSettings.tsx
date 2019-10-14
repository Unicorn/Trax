/** @jsx createElement **/
import { createElement, SFC } from 'react'
import { connect } from 'react-redux'
import { logout } from '@/controllers/githubController'
import { resetApp } from '@/models/app'

interface Props {
  resetApp: () => void
  logout: () => void
}

const AppSettings: SFC<Props> = props => {
  const { resetApp } = props

  return (
    <div className="fixed box bottom">
      <p>Current Version: {window.app.version}</p>
      <button className="small yellow button" onClick={logout}>
        Logout
      </button>
      <button className="small red button" onClick={resetApp}>
        Reset Application Data
      </button>
    </div>
  )
}

const mapDispatch = {
  resetApp,
  logout
}

export default connect(
  null,
  mapDispatch
)(AppSettings)
