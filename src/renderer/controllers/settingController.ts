import { SETTING, Settings, ActivePageValues, ActiveLaneValues, SettingsAction } from '@/models/setting'
import { initialState } from '@/models/app'
import { ScrumTypes } from '@/config/constants'

export const setPage = (value: ActivePageValues): SettingsAction => ({
  type: SETTING.SET_PAGE,
  payload: { page: value }
})

export const setLanes = (value: ActiveLaneValues): SettingsAction => ({
  type: SETTING.SET_LANES,
  payload: { lanes: value }
})

export const toggleShowBoardSearch = (value: boolean): SettingsAction => ({
  type: SETTING.SET_SHOW_BOARD_SEARCH,
  payload: { showBoardSearch: value }
})

export const toggleShowBoardHelp = (value: boolean): SettingsAction => ({
  type: SETTING.SET_SHOW_BOARD_HELP,
  payload: { showBoardHelp: value }
})

export const setFeaturePoints = (value: boolean): SettingsAction => ({
  type: SETTING.SET_FEATURE_POINTS,
  payload: { featurePoints: value }
})

export const setFeaturePriority = (value: boolean): SettingsAction => ({
  type: SETTING.SET_FEATURE_PRIORITY,
  payload: { featurePriority: value }
})

export const setFeatureTypes = (value: boolean): SettingsAction => ({
  type: SETTING.SET_FEATURE_TYPES,
  payload: { featureTypes: value }
})

export const setTemplate = (key: ScrumTypes, value: string): SettingsAction => ({
  type: SETTING.SET_TEMPLATE,
  payload: {
    templates: {
      [key]: value
    }
  }
})

export const settingsReducer = (state: Settings, action: SettingsAction): Settings => {
  if (state === undefined) return initialState.settings

  const { payload, type } = action

  if (!payload || !type) return state

  switch (type) {
    case SETTING.SET_PAGE:
    case SETTING.SET_LANES:
    case SETTING.SET_SHOW_BOARD_SEARCH:
    case SETTING.SET_SHOW_BOARD_HELP:
    case SETTING.SET_FEATURE_POINTS:
    case SETTING.SET_FEATURE_PRIORITY:
    case SETTING.SET_FEATURE_TYPES:
    case SETTING.SET_TEMPLATE:
      return { ...state, ...payload }

    default:
      return state
  }
}
