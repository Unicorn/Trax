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

export const toggleShowBoardSearch = (value: boolean): SettingsAction => ({
  type: SET_SETTING,
  payload: { key: 'showBoardSearch', value }
})

export const toggleShowBoardHelp = (value: boolean): SettingsAction => ({
  type: SET_SETTING,
  payload: { key: 'showBoardHelp', value }
})

export const setFeaturePoints = (value: boolean): SettingsAction => ({
  type: SET_SETTING,
  payload: { key: 'featurePoints', value }
})

const initialState: Settings = {
  page: 'welcome',
  lanes: LANES,
  showBoardSearch: false,
  showBoardHelp: false,
  featurePoints: true
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
