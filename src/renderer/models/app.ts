import { Resources, Alert, initResources } from 'horseshoes'
import { Action } from 'redux'
import { Google, googleState } from './google'
import { Profile, profileState } from './profile'
import { Issue, Issues } from './issue'
import { Invoice, Invoices } from './invoice'
import { Org, Orgs } from './org'
import { Timer, Timers } from './timer'
import { Track, Tracks } from './track'
import { Settings } from './setting'
import { Users, User } from './user'
import { Labels } from './label'
import { Milestones } from './milestone'
import { Repo, Repos } from './repo'
import { GithubAuth } from './github'
import { Lanes, defaultLanes } from './lane'

export enum APP {
  RESET = 'trax/app/reset'
}

export interface RootState {
  alerts: Resources<Alert>
  github: GithubAuth
  google: Google
  invoices: Invoices
  issues: Issues
  labels: Labels
  milestones: Milestones
  orgs: Orgs
  profile: Profile
  repos: Repos
  lanes: Lanes
  settings: Settings
  timers: Timers
  tracks: Tracks
  users: Users
}

export const initialState: RootState = {
  alerts: initResources<Alert>(),
  github: {},
  google: googleState,
  invoices: initResources<Invoice>(),
  issues: initResources<Issue>(),
  labels: [],
  milestones: [],
  orgs: initResources<Org>(),
  profile: profileState,
  repos: initResources<Repo>(),
  lanes: defaultLanes,
  settings: {
    page: 'welcome',
    showBoardSearch: false,
    showBoardHelp: false,
    showFilterMenu: false,
    invoices: {
      rate: '100'
    },
    features: {
      points: true,
      priority: true,
      types: true,
      orgTitles: false
    },
    templates: {
      epic: '',
      story: '',
      feature: '',
      bug: ''
    }
  },
  timers: initResources<Timer>(),
  tracks: initResources<Track>(),
  users: initResources<User>()
}

//
// Actions
//
export const resetApp = (): Action => ({ type: APP.RESET })
