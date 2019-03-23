import { v4 } from 'uuid'
import { camelizeKeys } from 'humps'

import { Auth } from './auth'
import { Profile } from './profile'
import { Alert, Alerts } from './alert'
import { Issue, Issues } from './issue'
import { Invoice, Invoices } from './invoice'
import { Orgs, Org } from './org'
import { Timer, Timers } from './timer'
import { Track, Tracks } from './track'
import { Settings } from './setting'

export interface Resource {
  key: string
}

export interface Resources {
  isLoading: boolean
  keys: string[]
  data: {
    [key: string]: any
  }
}

export type ModelResource = Alert | Issue | Invoice | Org | Timer | Track
export type ModelResources = Alerts | Issues | Invoices | Orgs | Timers | Tracks

export interface AppState {
  alerts: Resources
  auth: Auth
  invoices: Resources
  issues: Resources
  labels: Resources
  milestones: Resources
  orgs: Resources
  profile: Profile
  repos: Resources
  settings: Settings
  timers: Timers
  tracks: Resources
}

export const defaultState: Resources = {
  isLoading: false,
  keys: [],
  data: {}
}

export const scrubPayload = (payload: any): any => {
  let key: string = payload.nodeId || payload.id || v4()

  return { ...payload, key }
}

export const normalizePayload = (payload: any): any => {
  if (Array.isArray(payload)) return payload.map((r: any) => ({ ...scrubPayload(camelizeKeys(r)) }))

  return scrubPayload(camelizeKeys(payload))
}

export const toArray = (resources: ModelResources): ModelResource[] => {
  return resources.keys.map(key => resources.data[key])
}
