import * as React from 'react'
import { connect } from 'react-redux'
import { logout } from 'controllers/userController'
import Navigation from 'views/sections/Navigation'

interface Props {
  children: React.ReactNode
}

interface Actions {
  logout: () => void
}

const Dashboard: React.SFC<Props & Actions> = ({ children, logout }) => (
  <div>
    <div>
      <header className="toolbar">
        <div className="actions">
          <button className="basic micro button">
            Create Issue
          </button>

          <button className="red micro button" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      <Navigation />
    </div>

    <main className="dashboard">
      {children}
    </main>
  </div>
)

const mapDispatch = ({
  logout
})

export default connect<{}, Actions, Props>(null, mapDispatch)(Dashboard)
