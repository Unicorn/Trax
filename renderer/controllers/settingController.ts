import { LANES } from 'config/constants'
import { SET_SETTING, Setting, Settings, ActivePageValues, ActiveLaneValues, SettingsAction } from 'models/setting'

export const updateSetting = (payload: Setting): SettingsAction => ({
  type: SET_SETTING,
  payload
})

export const setPage = (value: ActivePageValues): SettingsAction => ({
  type: SET_SETTING,
  payload: { key: 'page', value }
})

export const setLanes = (value: ActiveLaneValues): SettingsAction => ({
  type: SET_SETTING,
  payload: { key: 'lanes', value }
})

export const toggleShowSearch = (value: boolean): SettingsAction => ({
  type: SET_SETTING,
  payload: { key: 'showSearch', value }
})

const initialState: Settings = {
  page: 'welcome',
  lanes: LANES,
  showSearch: false
}

export const settingsReducer = (state: Settings = initialState, action: SettingsAction): Settings => {
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
