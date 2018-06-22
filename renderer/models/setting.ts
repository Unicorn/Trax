export const SET_SETTING = 'trax/settings/SET_SETTING'

export type ActiveWidgetValues = 'phone' | 'contacts' | 'history' | 'settings'

type ActiveWidget = {
  key: 'activeWidget'
  value: ActiveWidgetValues
}

type Channel = {
  key: 'channel'
  value: string
}

type Connection = {
  key: 'connection'
  value: string
}

type Caller = {
  key: 'caller'
  value: string
}

type Prefix = {
  key: 'prefix'
  value: string
}

export type Setting = ActiveWidget | Channel | Connection | Caller | Prefix

export interface Settings {
  activeWidget: ActiveWidgetValues
  channel: string
  connection: string
  caller: string
  prefix: string
}

export interface SettingsAction {
  type: string
  payload?: Setting
}
