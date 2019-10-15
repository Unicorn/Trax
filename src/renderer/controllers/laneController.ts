import { initialState } from '@/models/app'
import { LANE, Lanes, LaneTypes, LanesAction } from '@/models/lane'

export const setLaneVisibility = (lane: LaneTypes, visible: boolean): LanesAction => ({
  type: LANE.SET_VISIBILITY,
  payload: { lane, visible }
})

export const lanesReducer = (state: Lanes, action: LanesAction): Lanes => {
  if (state === undefined) return initialState.lanes

  const { payload, type } = action

  if (!payload || !type) return state

  switch (type) {
    case LANE.SET_VISIBILITY:
      let newState = { ...state }
      newState[payload.lane].visible = payload.visible
      return newState

    default:
      return state
  }
}
