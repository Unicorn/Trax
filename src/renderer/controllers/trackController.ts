import { initialState } from '@/models/app'
import { TRACK, Track, TrackAction, Tracks } from '@/models/track'
import { Repo } from '@/models/repo'
import { deleteResource, updateResource } from 'horseshoes'

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

export const trackReducer = (state: Tracks, action: TrackAction): Tracks => {
  if (state === undefined) return initialState.tracks

  const { type, payload } = action

  if (!type || !payload) return state

  const newState = { ...state }

  switch (type) {
    case TRACK.CREATE:
    case TRACK.RELOAD:
    case TRACK.UPDATE:
      return updateResource<Track>(state, payload)

    case TRACK.DELETE:
      return deleteResource<Track>(state, payload)

    default:
      return state
  }

  return newState
}
