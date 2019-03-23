import { union, merge } from 'lodash'
import { defaultState, Resources } from 'models/app'
import * as TrackModel from 'models/track'
import { Repo } from 'models/repo'

export const reloadTrack = (payload: TrackModel.Track): TrackModel.TrackAction => ({
  type: TrackModel.TRACK.RELOAD,
  payload
})

export const createTrack = (payload: Repo): TrackModel.TrackAction => ({
  type: TrackModel.TRACK.CREATE,
  payload: {
    key: payload.fullName,
    ident: payload.fullName,
    active: true,
    repoId: payload.nodeId,
    userIds: [],
    issueIds: []
  }
})

export const updateTrack = (payload: TrackModel.Track): TrackModel.TrackAction => ({
  type: TrackModel.TRACK.UPDATE,
  payload
})

export const deleteTrack = (payload: TrackModel.Track): TrackModel.TrackAction => ({
  type: TrackModel.TRACK.DELETE,
  payload: {
    ...payload,
    active: false
  }
})

export const trackReducer = (state: Resources = defaultState, action: TrackModel.TrackAction): Resources => {
  const { type, payload } = action

  if (!type || !payload) return state

  const newState = { ...state }

  switch (type) {
    case TrackModel.TRACK.CREATE:
    case TrackModel.TRACK.RELOAD:
    case TrackModel.TRACK.UPDATE:
      newState.keys = union(newState.keys, [payload.key])
      newState.data[payload.key] = merge(newState.data[payload.key], payload)
      break

    case TrackModel.TRACK.DELETE:
      newState.keys = newState.keys.filter(key => key !== payload.key)
      delete newState.data[payload.key]
      break

    default:
      return state
  }

  return newState
}
