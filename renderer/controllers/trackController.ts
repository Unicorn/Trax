import { TRACK, Track, Tracks, TrackAction } from 'models/track'
import { Repo } from 'models/repo'

export const createTrack = (repo: Repo): TrackAction => ({
  type: TRACK.CREATE,
  payload: {
    ident: repo.fullName,
    repo,
    users: [],
    issues: []
  }
})

export const updateTrack = (payload: Track): TrackAction => ({
  type: TRACK.UPDATE,
  payload
})

export const deleteTrack = (track: Track): TrackAction => ({
  type: TRACK.DELETE,
  payload: track
})

export const trackReducer = (state: Tracks = {}, action: TrackAction) => {
  const { payload, type } = action

  if (!payload || !type) return state

  let newState = { ...state }

  switch (type)
  {
    case TRACK.CREATE :
      newState[payload.repo.nodeId] = payload
      return newState

    case TRACK.RELOAD :
    case TRACK.UPDATE :
      newState[payload.repo.nodeId] = {
        ...state[payload.repo.nodeId],
        ...payload
      }
      return newState

    case TRACK.DELETE :
      delete newState[payload.repo.nodeId]
      return newState

    default :
      return state
  }
}
