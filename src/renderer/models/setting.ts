import { Lane } from '@/config/constants'

export enum SETTING {
  SET_PAGE = 'trax/settings/SET_PAGE',
  SET_LANES = 'trax/settings/SET_LANES',
  SET_SHOW_BOARD_SEARCH = 'trax/settings/SET_SHOW_BOARD_SEARCH',
  SET_SHOW_BOARD_HELP = 'trax/settings/SET_SHOW_BOARD_HELP',
  SET_FEATURE_POINTS = 'trax/settting/SET_FEATURE_POINTS',
  SET_FEATURE_PRIORITY = 'trax/settting/SET_FEATURE_PRIORITY',
  SET_FEATURE_TYPES = 'trax/settting/SET_FEATURE_TYPES',
  SET_TEMPLATE = 'trax/setting/SET_TEMPLATE',
  SET_SETTING = 'trax/settings/SET_SETTING'
}

export type ActivePageValues = 'welcome' | 'profile' | 'create' | 'board' | 'timers' | 'invoices' | 'settings'

export type Features = 'featurePoints' | 'featurePriority' | 'featureTypes'

export type ActiveLaneValues = Lane[]

interface ActivePage {
  page: ActivePageValues
}

interface ActiveLanes {
  lanes: ActiveLaneValues
}

interface ShowBoardSearch {
  showBoardSearch: boolean
}

interface ShowBoardHelp {
  showBoardHelp: boolean
}

interface FeaturePoints {
  featurePoints: boolean
}

interface FeaturePriority {
  featurePriority: boolean
}

interface FeatureTypes {
  featureTypes: boolean
}

interface Templates {
  templates: {
    [key: string]: string
  }
}

export type Setting =
  | ActivePage
  | ActiveLanes
  | ShowBoardSearch
  | ShowBoardHelp
  | FeaturePoints
  | FeaturePriority
  | FeatureTypes
  | Templates

export interface Settings {
  page: ActivePageValues
  lanes: Lane[]
  showBoardSearch: boolean
  showBoardHelp: boolean
  featurePoints: boolean
  featurePriority: boolean
  featureTypes: boolean
  templates: {
    [key: string]: string
  }
}

export interface SettingsAction {
  type: SETTING
  payload?: Setting
}
