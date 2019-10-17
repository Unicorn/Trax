import { LabelsType } from '@/models/label'

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
  pink: 'E068DB'
}

export const TYPES: LabelsType = {
  epic: {
    label: 'Epic',
    name: '---epic',
    color: 'A789F6'
  },
  story: {
    label: 'Story',
    name: '--story',
    color: 'C0ABF8'
  },
  feature: {
    label: 'Feature',
    name: '-feature',
    color: 'DBCEFD'
  },
  bug: {
    label: 'Bug',
    name: '-bug',
    color: 'DBCEFD'
  }
}

export type ScrumTypes = 'epic' | 'story' | 'feature' | 'bug'
export const scrumTypes = ['epic', 'story', 'feature', 'bug']

export const PRIORITY: LabelsType = {
  high: {
    label: 'High',
    name: '!!!',
    color: 'FF9898'
  },
  medium: {
    label: 'Medium',
    name: '!!',
    color: 'F7C6C6'
  },
  low: {
    label: 'Low',
    name: '!',
    color: 'FFE9E9'
  }
}

export const POINTS: LabelsType = {
  '1': {
    label: '1',
    name: '•',
    color: '51B294'
  },
  '3': {
    label: '3',
    name: '•••',
    color: '51B294'
  },
  '5': {
    label: '5',
    name: '•••••',
    color: '51B294'
  }
}

export const MICROSERVICE = {
  API: 'https://api.trax.management',
  GITHUB: {
    AUTH: '/github/auth'
  },
  GOOGLE: {
    AUTH: '/google/auth'
  }
}

export const GITHUB = {
  API: 'https://api.github.com/',
  HOST: 'https://github.com',
  CLIENT_ID: '67c705a18a7b8576a4c1',
  SCOPE: 'user,public_repo,repo,repo_deployment,notifications'
}
