import {
  SET_SETTING,
  Setting,
  Settings,
  ActiveWidgetValues,
  SettingsAction
} from 'models/setting'

export const updateSetting = (payload: Setting): SettingsAction => ({
  type: SET_SETTING,
  payload
})

export const setChannel = (value: string): SettingsAction => ({
  type: SET_SETTING,
  payload: { key: 'channel', value }
})

export const setConnection = (value: string): SettingsAction => ({
  type: SET_SETTING,
  payload: { key: 'connection', value }
})

export const setCaller = (value: string): SettingsAction => ({
  type: SET_SETTING,
  payload: { key: 'caller', value }
})

export const setPrefix = (value: string): SettingsAction => ({
  type: SET_SETTING,
  payload: { key: 'prefix', value }
})

export const setActiveWidget = (value: ActiveWidgetValues): SettingsAction => ({
  type: SET_SETTING,
  payload: { key: 'activeWidget', value }
})

const initialState: Settings = {
  activeWidget: 'phone',
  channel: '',
  connection: '',
  caller: '',
  prefix: ''
}

export const settingsReducer = (
  state: Settings = initialState,
  action: SettingsAction
) => {
  const { payload, type } = action

  if (!payload || !type) return state

  switch (type) {
    case SET_SETTING:
      let newState = state
      newState[payload.key] = payload.value

      return {
        ...state,
        ...newState
      }

    default:
      return state
  }
}
