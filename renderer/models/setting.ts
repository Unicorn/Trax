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

interface ShowSearch {
  key: 'showSearch'
  value: boolean
}

export type Setting = ActivePage | ActiveLanes | ShowSearch

export interface Settings {
  page: ActivePageValues
  lanes: Lane[]
  showSearch: boolean
}

export interface SettingsAction {
  type: string
  payload?: Setting
}
