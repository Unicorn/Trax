import * as React from 'react'
import { connect } from 'react-redux'
import { Auth } from 'models/auth'

import Dashboard from 'views/layouts/Dashboard'
import Welcome from 'views/layouts/Welcome'
import Board from 'views/pages/Board'
import Profile from 'views/pages/Profile'
import Report from 'views/pages/Report'
import Invoice from 'views/pages/Invoice'
import Settings from 'views/pages/Settings'
import { ROUTES } from 'config/constants'

interface Connected {
  auth: Auth
  page: string
}

const Page: React.SFC<Connected> = ({ page, auth }) => {
  if (page === ROUTES.welcome.name && !auth.accessToken)
    return <Welcome />

  var child = null

  switch(page) {
    case ROUTES.board.name :
      child = <Board />
      break
    case ROUTES.board.name :
      child = <Board />
      break
    case ROUTES.profile.name :
      child = <Profile />
      break
    case ROUTES.report.name :
      child = <Report />
      break
    case ROUTES.invoice.name :
      child = <Invoice />
      break
    case ROUTES.settings.name :
      child = <Settings/>
      break
    default :
      child = <Board />
  }

  return <Dashboard>{child}</Dashboard>
}

const mapState = (state: any): Connected => ({
  auth: state.auth,
  page: state.settings.page,
})

export default connect(mapState)(Page)
