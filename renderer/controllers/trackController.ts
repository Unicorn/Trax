import { TRACK, Track, Tracks, TrackAction } from 'models/track'
import { Repo } from 'models/repo'

export const createTrack = (repo: Repo): TrackAction => ({
  type: TRACK.CREATE,
  payload: {
    ident: repo.fullName,
    repo
  }
})

export const deleteTrack = (track: Track): TrackAction => ({
  type: TRACK.DELETE,
  payload: track
})

export const trackReducer = (state: Tracks = [], action: TrackAction) => {
  const { payload, type } = action

  if (!payload || !type) return state

  let newState = state.slice()

  switch (type)
  {
    case TRACK.CREATE :
      return newState.concat(payload)

    case TRACK.DELETE :
      return state.filter((t: Track) => t.ident !== payload.ident)

    default :
      return state
  }
}
