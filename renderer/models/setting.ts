import { Lane } from 'config/constants'

export const SET_SETTING = 'trax/settings/SET_SETTING'

export type ActivePageValues = 'welcome' | 'profile' | 'create' | 'board' | 'timers' | 'invoices' | 'settings'

export type ActiveLaneValues = Lane[]

interface ActivePage {
  key: 'page'
  value: ActivePageValues
}

interface ActiveLanes {
  key: 'lanes'
  value: ActiveLaneValues
}

export type Setting = ActivePage | ActiveLanes

export interface Settings {
  page: ActivePageValues
  lanes: Lane[]
}

export interface SettingsAction {
  type: string
  payload?: Setting
}
