import * as React from 'react'
import { connect } from 'react-redux'
import { logout } from 'controllers/authController'
import { resetApp } from 'models/app'

interface Props {
  resetApp: () => void
  logout: () => void
}

const AppSettings: React.SFC<Props> = (props) => {
  const { resetApp } = props

  return (
    <div>
      <p>Current Version: {window.app.version}</p>
      <button className="yellow button" onClick={logout}>Logout</button>
      <button className="red button" onClick={resetApp}>Reset Application Data</button>
    </div>
  )
}

const mapDispatch = ({
  resetApp,
  logout
})

export default connect(null, mapDispatch)(AppSettings)
