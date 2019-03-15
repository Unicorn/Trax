import { User } from 'models/user'
import { Issue } from 'models/issue'
import { Repo } from 'models/repo'

export enum TRACK {
  CREATE = 'trax/track/CREATE',
  UPDATE = 'trax/track/UPDATE',
  DELETE = 'trax/track/DELETE',
  RELOAD = 'trax/track/RELOAD',
  CLEAR =  'trax/track/CLEAR'
}

export interface Track {
  active: boolean
  ident: string
  repo: Repo
  users: User[]
  issues: Issue[]
}

export interface Tracks {
  [key: string]: Track
}

export interface TrackAction {
  type: TRACK
  payload?: Track
}
