import { ActivePageValues } from 'models/setting'

export type Swimlane = {
  label: string
  name: Lane
  color: string
}

export type Swimlanes = {
  [key: string]: Swimlane;
}

export type Lane = 'backlog' | 'sprint' | 'started' | 'review' | 'complete'

export type Routes = {
  [key: string]: {
    name: ActivePageValues
    path: string
  }
}

export const IDENT = 'Trax'

export const COLORS = {
  blue: '3C7CB3',
  orange: 'F85E10',
  purple: '7C30D4',
  green: '5FB42F',
  yellow: 'F0CF0F',
  cyan: '48B1C6',
  teal: '51B294',
  red: 'B33C3C',
  pink: 'E068DB',
}

export const ROUTES: Routes = {
  welcome: {
    name: 'welcome',
    path: '/welcome',
  },
  create: {
    name: 'create',
    path: '/create',
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

export const SWIMLANES: Swimlanes = {
  backlog: {
    label: 'Backlog',
    name: 'backlog',
    color: COLORS.pink,
  },
  sprint: {
    label: 'Sprint',
    name: 'sprint',
    color: COLORS.cyan,
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

export const TYPES = {
  epic: {
    label: 'Epic',
    name: '---epic',
    color: '#7E5ADD'
  },
  story: {
    label: 'Story',
    name: '--story',
    color: '#AA8FEF'
  },
  feature: {
    label: 'Feature',
    name: '-feature',
    color: '#D0C1F9'
  },
  bug: {
    label: 'Bug',
    name: '-bug',
    color: '#D0C1F9'
  }
}

export const PRIORITY = {
  high: {
    label: 'High',
    name: '!!!',
    color: '#DD5A5A'
  },
  medium: {
    label: 'Medium',
    name: '!!',
    color: '#E79595'
  },
  low: {
    label: 'Low',
    name: '!',
    color: '#F9D4D4'
  }
}

interface ILABEL {
  [key: string]: {
    label: string
    name: string
    color: string
  }
}

export const LABELS: ILABEL = {
  ...SWIMLANES,
  ...TYPES,
  ...PRIORITY
}

export const LANES: Lane[] = Object
  .keys(SWIMLANES as Swimlanes)
  .map((key: string) => (SWIMLANES[key] as Swimlane).name as Lane)

export const MICROSERVICE = {
  API: 'https://trax-go.herokuapp.com'
}

export const GITHUB = {
  API:        'https://api.github.com/',
  HOST:       'https://github.com',
  CLIENT_ID:  '67c705a18a7b8576a4c1',
  SCOPE:      'user,public_repo,repo,repo_deployment,notifications',
}
