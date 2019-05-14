import { union, merge } from 'lodash'
import { defaultState, Resources } from '@/models/app'
import { TRACK, Track, TrackAction } from '@/models/track'
import { Repo } from '@/models/repo'

export const reloadTrack = (payload: Track): TrackAction => ({
  type: TRACK.RELOAD,
  payload
})

export const createTrack = (payload: Repo): TrackAction => ({
  type: TRACK.CREATE,
  payload: {
    key: payload.fullName,
    ident: payload.fullName,
    active: true,
    repoId: payload.nodeId,
    userIds: [],
    issueIds: []
  }
})

export const updateTrack = (payload: Track): TrackAction => ({
  type: TRACK.UPDATE,
  payload
})

export const deleteTrack = (payload: Track): TrackAction => ({
  type: TRACK.DELETE,
  payload: {
    ...payload,
    active: false
  }
})

export const trackReducer = (state: Resources = defaultState, action: TrackAction): Resources => {
  const { type, payload } = action

  if (!type || !payload) return state

  const newState = { ...state }

  switch (type) {
    case TRACK.CREATE:
    case TRACK.RELOAD:
    case TRACK.UPDATE:
      newState.keys = union(newState.keys, [payload.key])
      newState.data[payload.key] = merge(newState.data[payload.key], payload)
      break

    case TRACK.DELETE:
      newState.keys = newState.keys.filter(key => key !== payload.key)
      delete newState.data[payload.key]
      break

    default:
      return state
  }

  return newState
}
