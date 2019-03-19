import { Auth } from './auth'
import { Profile } from './profile'

export interface Resource {
  key: string
}

export interface Resources {
  keys: string[]
  data: {
    [key: string]: any
  }
}

export interface AppState {
  alerts: Resources,
  auth: Auth,
  invoices: Resources,
  issues: Resources,
  labels: Resources,
  milestones: Resources
  orgs: Resources
  profile: Profile,
  repos: Resources
  settings: Resources
  timers: Resources
  tracks: Resources
}

export const initialState: Resources = {
  keys: [],
  data: {}
}

export const toArray = (resources: Resources): Resource[] => {
  return resources.keys.map(key => resources.data[key])
}
