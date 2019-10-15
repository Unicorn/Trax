import { initialState } from '@/models/app'
import { LANE, Lanes, LaneTypes, LanesAction } from '@/models/lane'

export const setVisible = (lane: LaneTypes, visible: boolean): LanesAction => ({
  type: LANE.SET_VISIBILITY,
  payload: { lane, visible }
})

export const setCollapsed = (lane: LaneTypes, collapsed: boolean): LanesAction => ({
  type: LANE.SET_COLLAPSED,
  payload: { lane, collapsed }
})

export const lanesReducer = (state: Lanes, action: LanesAction): Lanes => {
  if (state === undefined) return initialState.lanes

  const { payload, type } = action

  let newState = { ...state }

  if (!payload || !type) return state

  switch (type) {
    case LANE.SET_VISIBILITY:
      newState[payload.lane].visible = payload.visible || false
      return newState

    case LANE.SET_COLLAPSED:
      newState[payload.lane].collapsed = payload.collapsed || false
      return newState

    default:
      return state
  }
}
