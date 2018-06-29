export const IDENT = 'Trax'

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

export const ROUTES = {
  welcome: {
    name: 'welcome',
    path: '/welcome',
  },
  board: {
    name: 'board',
    path: '/board',
  },
  profile: {
    name: 'profile',
    path: '/profile',
  },
  report: {
    name: 'report',
    path: '/report',
  },
  invoice: {
    name: 'invoice',
    path: '/invoice',
  },
  settings: {
    name: 'settings',
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

export const MICROSERVICE = {
  API: 'https://trax-go.herokuapp.com'
}

export const GITHUB = {
  API:        'https://api.github.com/',
  HOST:       'https://github.com',
  CLIENT_ID:  '67c705a18a7b8576a4c1',
  SCOPE:      'user,public_repo,repo,repo_deployment,notifications',
}
