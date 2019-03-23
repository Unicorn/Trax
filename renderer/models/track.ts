import { Resources, Resource } from 'models/app'

export enum TRACK {
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

export interface Tracks extends Resources {
  data: {
    [key: string]: Track
  }
}

export interface TrackAction {
  type: TRACK
  payload?: Track
}
