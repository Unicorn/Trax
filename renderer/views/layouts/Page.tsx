import * as React from 'react'
import { connect } from 'react-redux'
import { Auth } from 'models/auth'
import { ROUTES } from 'config/constants'

import * as Pages from 'views/pages'
import Dashboard from 'views/layouts/Dashboard'
import WelcomePage from 'views/pages/WelcomePage'

interface Connected {
  auth: Auth
  page: string
}

const Page: React.SFC<Connected> = ({ page, auth }) => {
  if (page === ROUTES.welcome.name && !auth.accessToken)
    return <WelcomePage />

  var child = null

  switch(page) {
    case ROUTES.board.name :
      child = <Pages.BoardPage />
      break
    case ROUTES.create.name :
      child = <Pages.CreatePage />
      break
    case ROUTES.profile.name :
      child = <Pages.ProfilePage />
      break
    case ROUTES.timers.name :
      child = <Pages.TimersPage />
      break
    case ROUTES.invoices.name :
      child = <Pages.InvoicesPage />
      break
    case ROUTES.settings.name :
      child = <Pages.SettingsPage/>
      break
    default :
      child = <Pages.BoardPage />
  }

  return <Dashboard>{child}</Dashboard>
}

const mapState = (state: any): Connected => ({
  auth: state.auth,
  page: state.settings.page,
})

export default connect(mapState)(Page)
