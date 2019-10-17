import { SETTING, Settings, ActivePageValues, SettingsAction } from '@/models/setting'
import { initialState } from '@/models/app'
import { ScrumTypes } from '@/config/constants'

export const setPage = (page: ActivePageValues): SettingsAction => ({
  type: SETTING.SET_PAGE,
  payload: { page }
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

export const setInvoicesSettings = (key: string, value: string): SettingsAction => ({
  type: SETTING.SET_INVOICES,
  payload: { invoices: { [key]: value } }
})

export const setFeaturesSettings = (key: string, value: boolean): SettingsAction => ({
  type: SETTING.SET_FEATURES,
  payload: { features: { [key]: value } }
})

export const setTemplate = (key: ScrumTypes, value: string): SettingsAction => ({
  type: SETTING.SET_TEMPLATES,
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
    case SETTING.SET_FEATURES:
    case SETTING.SET_INVOICES:
    case SETTING.SET_PAGE:
    case SETTING.SET_SHOW_BOARD_SEARCH:
    case SETTING.SET_SHOW_BOARD_HELP:
    case SETTING.SET_TEMPLATES:
    case SETTING.SET_SHOW_FILTER_MENU:
      return { ...state, ...payload }

    default:
      return state
  }
}
