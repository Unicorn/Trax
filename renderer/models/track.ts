import { Repo } from 'models/repo'

export enum TRACK {
  CREATE = 'trax/track/CREATE',
  DELETE = 'trax/track/DELETE',
  CLEAR =  'trax/track/CLEAR'
}

export interface Track {
  ident: string
  repo: Repo
}

export type Tracks = Track[]

export interface TrackAction {
  type: TRACK
  payload?: Track
}
