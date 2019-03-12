import { Lane } from 'config/constants'

export const SET_SETTING = 'trax/settings/SET_SETTING'

export type ActivePageValues = 'welcome' | 'create' | 'board' | 'profile' | 'report' | 'invoice' | 'settings'

export type ActiveLaneValues = Lane[]

type ActivePage = {
  key: 'page'
  value: ActivePageValues
}

type ActiveLanes = {
  key: 'lanes',
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
