import { Resources, Resource } from 'horseshoes'

export enum TRACK {
  REQUEST = 'trax/track/REQUEST',
  CREATE = 'trax/track/CREATE',
  UPDATE = 'trax/track/UPDATE',
  DELETE = 'trax/track/DELETE',
  RELOAD = 'trax/track/RELOAD',
  CLEAR = 'trax/track/CLEAR'
}

export interface Track extends Resource {
  active: boolean
  ident: string
  repoId: string
  userIds: string[]
  issueIds: string[]
}

export interface Tracks extends Resources<Track> {
  debug?: boolean // Stubbed
}

export interface TrackAction {
  type: TRACK
  payload?: Track
}
