import Dashboard from '@/views/layouts/Dashboard'
import WelcomePage from '@/views/pages/WelcomePage'
import ProfilePage from '@/views/pages/ProfilePage'
import BoardPage from '@/views/pages/BoardPage'
import CreatePage from '@/views/pages/CreatePage'
import TimersPage from '@/views/pages/TimersPage'
import InvoicesPage from '@/views/pages/InvoicesPage'
import SettingsPage from '@/views/pages/SettingsPage'
import { ActivePageValues } from '@/models/setting'

export interface Routes {
  [key: string]: {
    component: string
    name: ActivePageValues
    path: string
  }
}

export const ROUTES: Routes = {
  welcome: {
    component: 'WelcomePage',
    name: 'welcome',
    path: '/welcome'
  },
  create: {
    component: 'CreatePage',
    name: 'create',
    path: '/create'
  },
  board: {
    component: 'BoardPage',
    name: 'board',
    path: '/board'
  },
  profile: {
    component: 'ProfilePage',
    name: 'profile',
    path: '/profile'
  },
  timers: {
    component: 'TimersPage',
    name: 'timers',
    path: '/timers'
  },
  invoices: {
    component: 'InvoicesPage',
    name: 'invoices',
    path: '/invoices'
  },
  settings: {
    component: 'SettingsPage',
    name: 'settings',
    path: '/settings'
  }
}

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
