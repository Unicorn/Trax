import { Repo } from 'models/repo'

export const TRACK = {
  CREATE: 'trax/track/CREATE',
  DELETE: 'trax/track/DELETE',
  CLEAR:  'trax/track/CLEAR'
}

export interface Track {
  ident: string
  repo: Repo
}

export type Tracks = Track[]

export interface TrackAction {
  type: typeof TRACK.CREATE | typeof TRACK.DELETE | typeof TRACK.CLEAR
  payload?: Track
}
