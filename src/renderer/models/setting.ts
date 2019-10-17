import { RootState } from './app'

export enum SETTING {
  SET_PAGE = 'trax/settings/SET_PAGE',
  SET_LANE_SETTINGS = 'trax/settings/SET_LANE_SETTINGS',
  SET_SHOW_BOARD_SEARCH = 'trax/settings/SET_SHOW_BOARD_SEARCH',
  SET_SHOW_BOARD_HELP = 'trax/settings/SET_SHOW_BOARD_HELP',
  SET_INVOICES = 'trax/settting/SET_INVOICES',
  SET_FEATURES = 'trax/settting/SET_FEATURES',
  SET_TEMPLATES = 'trax/setting/SET_TEMPLATES',
  SET_SETTING = 'trax/settings/SET_SETTING',
  SET_SHOW_FILTER_MENU = 'trax/settings/SET_SHOW_FILTER_MENU',
}

export type ActivePageValues = 'welcome' | 'profile' | 'create' | 'board' | 'timers' | 'invoices' | 'settings'

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

interface FeaturesSettings {
  features: {
    points?: boolean
    types?: boolean
    priority?: boolean
    orgTitles?: boolean
  }
}

interface InvoicesSettings {
  invoices: {
    rate?: string
  }
}

interface TemplatesSettings {
  templates: {
    [key: string]: string
  }
}

export type Setting =
  | ActivePage
  | ShowBoardSearch
  | ShowBoardHelp
  | FeaturesSettings
  | InvoicesSettings
  | TemplatesSettings
  | ShowFilterMenu

export interface Settings extends TemplatesSettings, FeaturesSettings, InvoicesSettings {
  page: ActivePageValues
  showBoardSearch: boolean
  showFilterMenu: boolean
  showBoardHelp: boolean
}

export interface SettingsAction {
  type: SETTING
  payload?: Setting
}

export const getSettings = ({ settings }: RootState): Settings => settings
