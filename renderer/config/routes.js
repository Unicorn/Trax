import Dashboard from 'views/layouts/Dashboard'
import Welcome from 'views/layouts/Welcome'
import Profile from 'views/pages/Profile'
import Board from 'views/pages/Board'
import Report from 'views/pages/Report'
import Settings from 'views/pages/Settings'
import { ROUTES } from 'config/constants'

export default [
  {
    path: ROUTES.welcome.path,
    exact: true,
    component: Welcome,
  },
  {
    component: Dashboard,
    path: '/',
    routes: [
      { path: ROUTES.board.path, component: Board },
      { path: ROUTES.profile.path, component: Profile },
      { path: ROUTES.report.path, component: Report },
      { path: ROUTES.settings.path, component: Settings },
    ],
  },
]
