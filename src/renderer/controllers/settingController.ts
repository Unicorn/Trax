import { SETTING, Settings, ActivePageValues, ActiveLaneValues, SettingsAction } from '@/models/setting'
import { initialState } from '@/models/app'
import { ScrumTypes } from '@/config/constants'

export const setPage = (page: ActivePageValues): SettingsAction => ({
  type: SETTING.SET_PAGE,
  payload: { page }
})

export const setLanes = (lanes: ActiveLaneValues): SettingsAction => ({
  type: SETTING.SET_LANES,
  payload: { lanes }
})

export const toggleShowBoardSearch = (showBoardSearch: boolean): SettingsAction => ({
  type: SETTING.SET_SHOW_BOARD_SEARCH,
  payload: { showBoardSearch }
})

export const toggleShowFilterMenu = (showFilterMenu: boolean): SettingsAction => ({
  type: SETTING.SET_SHOW_FILTER_MENU,
  payload: { showFilterMenu }
})

export const toggleShowBoardHelp = (showBoardHelp: boolean): SettingsAction => ({
  type: SETTING.SET_SHOW_BOARD_HELP,
  payload: { showBoardHelp }
})

export const setFeaturePoints = (featurePoints: boolean): SettingsAction => ({
  type: SETTING.SET_FEATURE_POINTS,
  payload: { featurePoints }
})

export const setFeaturePriority = (featurePriority: boolean): SettingsAction => ({
  type: SETTING.SET_FEATURE_PRIORITY,
  payload: { featurePriority }
})

export const setFeatureTypes = (featureTypes: boolean): SettingsAction => ({
  type: SETTING.SET_FEATURE_TYPES,
  payload: { featureTypes }
})

export const setFeatureOrgTitles = (featureOrgTitles: boolean): SettingsAction => ({
  type: SETTING.SET_FEATURE_ORG_TITLES,
  payload: { featureOrgTitles }
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
    case SETTING.SET_FEATURE_ORG_TITLES:
    case SETTING.SET_TEMPLATE:
    case SETTING.SET_SHOW_FILTER_MENU:
      return { ...state, ...payload }

    default:
      return state
  }
}
