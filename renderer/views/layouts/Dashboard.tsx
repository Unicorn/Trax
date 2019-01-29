import * as React from 'react'
import { connect } from 'react-redux'
import { logout } from 'controllers/authController'
import Navigation from 'views/sections/Navigation'
import NavLink from 'views/ui/NavLink'
import { ROUTES } from 'config/constants'

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
          <NavLink className="basic micro button" name={ROUTES.create.name}>Create Issue</NavLink>

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
