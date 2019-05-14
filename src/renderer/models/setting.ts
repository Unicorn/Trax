import { Lane } from '@/config/constants'

export const SET_SETTING = 'trax/settings/SET_SETTING'

export type ActivePageValues = 'welcome' | 'profile' | 'create' | 'board' | 'timers' | 'invoices' | 'settings'

export type Features = 'featurePoints' | 'featurePriority' | 'featureTypes'

export type ActiveLaneValues = Lane[]

interface ActivePage {
  key: 'page'
  value: ActivePageValues
}

interface ActiveLanes {
  key: 'lanes'
  value: ActiveLaneValues
}

interface ShowBoardSearch {
  key: 'showBoardSearch'
  value: boolean
}

interface ShowBoardHelp {
  key: 'showBoardHelp'
  value: boolean
}

interface FeatureSetting {
  key: Features
  value: boolean
}

export type Setting = ActivePage | ActiveLanes | ShowBoardSearch | ShowBoardHelp | FeatureSetting

export interface Settings {
  page: ActivePageValues
  lanes: Lane[]
  showBoardSearch: boolean
  showBoardHelp: boolean
  featurePoints: boolean
  featurePriority: boolean
  featureTypes: boolean
}

export interface SettingsAction {
  type: string
  payload?: Setting
}
