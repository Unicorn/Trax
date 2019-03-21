import Dashboard from 'views/layouts/Dashboard'
import WelcomePage from 'views/pages/WelcomePage'
import ProfilePage from 'views/pages/ProfilePage'
import BoardPage from 'views/pages/BoardPage'
import CreatePage from 'views/pages/CreatePage'
import TimersPage from 'views/pages/TimersPage'
import InvoicesPage from 'views/pages/InvoicesPage'
import SettingsPage from 'views/pages/SettingsPage'
import { ROUTES } from 'config/constants'

export default [
  {
    path: ROUTES.welcome.path,
    exact: true,
    component: WelcomePage
  },
  {
    component: Dashboard,
    path: '/',
    routes: [
      { path: ROUTES.board.path, component: BoardPage },
      { path: ROUTES.create.path, component: CreatePage },
      { path: ROUTES.profile.path, component: ProfilePage },
      { path: ROUTES.timers.path, component: TimersPage },
      { path: ROUTES.invoices.path, component: InvoicesPage },
      { path: ROUTES.settings.path, component: SettingsPage }
    ]
  }
]
