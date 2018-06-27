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
