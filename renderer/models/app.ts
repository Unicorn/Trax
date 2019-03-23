import { v4 } from 'uuid'
import { camelizeKeys } from 'humps'

import { Auth } from './auth'
import { Profile } from './profile'
import { Timers } from 'models/timer'

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
  settings: Resources
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

export const normalizePayload = (payload: Resource | Resources): Resource | Resource[] => {
  if (Array.isArray(payload)) return payload.map((r: any) => ({ ...scrubPayload(camelizeKeys(r)) }))

  return scrubPayload(camelizeKeys(payload))
}

export const toArray = (resources: Resources): Resource[] => {
  return resources.keys.map(key => resources.data[key])
}
