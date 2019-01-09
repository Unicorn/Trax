export const SET_SETTING = 'trax/settings/SET_SETTING'

export type ActivePageValues = 'welcome' | 'create' | 'board' | 'profile' | 'report' | 'invoice' | 'settings'

type ActivePage = {
  key: 'page'
  value: ActivePageValues
}

export type Setting = ActivePage

export interface Settings {
  page: ActivePageValues
}

export interface SettingsAction {
  type: string
  payload?: Setting
}
