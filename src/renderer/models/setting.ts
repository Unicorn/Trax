import { RootState } from './app'

export enum SETTING {
  SET_PAGE = 'trax/settings/SET_PAGE',
  SET_LANE_SETTINGS = 'trax/settings/SET_LANE_SETTINGS',
  SET_SHOW_BOARD_SEARCH = 'trax/settings/SET_SHOW_BOARD_SEARCH',
  SET_SHOW_BOARD_HELP = 'trax/settings/SET_SHOW_BOARD_HELP',
  SET_FEATURE_POINTS = 'trax/settting/SET_FEATURE_POINTS',
  SET_FEATURE_PRIORITY = 'trax/settting/SET_FEATURE_PRIORITY',
  SET_FEATURE_TYPES = 'trax/settting/SET_FEATURE_TYPES',
  SET_FEATURE_ORG_TITLES = 'trax/setting/SET_FEATURE_ORG_TITLES',
  SET_TEMPLATE = 'trax/setting/SET_TEMPLATE',
  SET_SETTING = 'trax/settings/SET_SETTING',
  SET_SHOW_FILTER_MENU = 'trax/settings/SET_SHOW_FILTER_MENU',
  SET_GOOGLE_KEY = 'trax/settings/SET_GOOGLE_KEY',
  SET_GOOGLE_SECRET = 'trax/settings/SET_GOOGLE_SECRET',
  SET_GOOGLE_TOKEN = 'trax/settings/SET_GOOGLE_TOKEN'
}

export type ActivePageValues = 'welcome' | 'profile' | 'create' | 'board' | 'timers' | 'invoices' | 'settings'

export type Features = 'featurePoints' | 'featurePriority' | 'featureTypes'

interface ActivePage {
  page: ActivePageValues
}

interface ShowBoardSearch {
  showBoardSearch: boolean
}

interface ShowFilterMenu {
  showFilterMenu: boolean
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

interface FeatureOrgTitles {
  featureOrgTitles: boolean
}

interface Templates {
  templates: {
    [key: string]: string
  }
}

export type Setting =
  | ActivePage
  | ShowBoardSearch
  | ShowBoardHelp
  | FeaturePoints
  | FeaturePriority
  | FeatureTypes
  | FeatureOrgTitles
  | Templates
  | ShowFilterMenu

export interface Settings extends Templates {
  page: ActivePageValues
  showBoardSearch: boolean
  showFilterMenu: boolean
  showBoardHelp: boolean
  featurePoints: boolean
  featurePriority: boolean
  featureTypes: boolean
  featureOrgTitles: boolean
}

export interface SettingsAction {
  type: SETTING
  payload?: Setting
}

export const getSettings = ({ settings }: RootState): Settings => settings
