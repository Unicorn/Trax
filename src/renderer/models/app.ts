import { Resources, Alert, initResources } from 'horseshoes'

import { Auth } from './auth'
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
import { LANES } from '@/config/constants'

export enum APP {
  RESET = 'trax/app/reset'
}

export interface RootState {
  alerts: Resources<Alert>
  auth: Auth
  invoices: Invoices
  issues: Issues
  labels: Labels
  milestones: Milestones
  orgs: Orgs
  profile: Profile
  repos: Repos
  settings: Settings
  timers: Timers
  tracks: Tracks
  users: Users
}

export const initialState: RootState = {
  alerts: initResources<Alert>(),
  auth: {},
  invoices: initResources<Invoice>(),
  issues: initResources<Issue>(),
  labels: [],
  milestones: [],
  orgs: initResources<Org>(),
  profile: profileState,
  repos: initResources<Repo>(),
  settings: {
    page: 'welcome',
    lanes: LANES,
    showBoardSearch: false,
    showBoardHelp: false,
    showFilterMenu: false,
    featurePoints: true,
    featurePriority: true,
    featureTypes: true,
    featureOrgTitles: true,
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
export const resetApp = () => ({ type: APP.RESET })
