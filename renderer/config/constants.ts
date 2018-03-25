export const COLORS = {
  blue: '#3C7CB3',
  orange: '#F85E10',
  purple: '#7C30D4',
  green: '#5FB42F',
  yellow: '#F0CF0F',
  cyan: '#48B1C6',
  teal: '#51B294',
  red: '#B33C3C',
  pink: '#E068DB',
  white: 'rgb(251, 249, 243)',
  eggshell: '#fbf9f4',
  brown: '#99896F',
}

export const TRAX_IDENT = 'Trax'

export const ROUTES = {
  welcome: {
    text: 'Welcome',
    path: '/welcome',
  },
  board: {
    text: 'Board',
    path: '/board',
  },
  profile: {
    text: 'Profile',
    path: '/profile',
  },
  report: {
    text: 'Report',
    path: '/report',
  },
  invoice: {
    text: 'Invoice',
    path: '/invoice',
  },
  settings: {
    text: 'Settings',
    path: '/settings',
  },
}

export const SWIMLANES = {
  backlog: {
    label: 'Backlog',
    name: 'backlog',
    color: COLORS.pink,
  },
  started: {
    label: 'Started',
    name: 'started',
    color: COLORS.orange,
  },
  review: {
    label: 'Review',
    name: 'review',
    color: COLORS.blue,
  },
  complete: {
    label: 'Complete',
    name: 'complete',
    color: COLORS.green,
  },
}

export const GITHUB = {
  host: 'https://github.com',
  api: 'https://api.github.com',
  client_id: process.env.GH_CLIENT_ID,
  client_secret: process.env.GH_CLIENT_SECRET,
  scope: 'user,public_repo,repo,repo_deployment,notifications',
}
