import * as React from 'react'
import { connect } from 'react-redux'
import { logout } from 'controllers/authController'
import Navigation from 'views/sections/Navigation'
import AlertsList from 'views/ui/alert/AlertsList'

interface Props {
  children: React.ReactNode
}

interface Actions {
  alerts: any
  logout: () => void
}

const Dashboard: React.SFC<Props & Actions> = ({ children, logout }) => (
  <div>
    <div>
      <header className="toolbar">
        <div className="actions">
          Current Version: {window.app.version}

          <button className="red micro button" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      <AlertsList />

      <Navigation />
    </div>

    <main className="dashboard">
      {children}
    </main>
  </div>
)

const mapState = (state: any) => ({
  alerts: state.alerts
})

const mapDispatch = ({
  logout
})

export default connect(mapState, mapDispatch)(Dashboard)
