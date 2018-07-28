import {
  SET_SETTING,
  Setting,
  Settings,
  ActivePageValues,
  SettingsAction
} from 'models/setting'

export const updateSetting = (payload: Setting): SettingsAction => ({
  type: SET_SETTING,
  payload
})

export const setPage = (value: ActivePageValues): SettingsAction => ({
  type: SET_SETTING,
  payload: { key: 'page', value }
})

const initialState: Settings = {
  page: 'welcome',
}

export const settingsReducer = (
  state: Settings = initialState,
  action: SettingsAction
) => {
  const { payload, type } = action
  let newState = { ...state }
  
  if (!payload || !type) return state

  switch (type) {
    case SET_SETTING:
      newState[payload.key] = payload.value
      return newState

    default:
      return state
  }
}
