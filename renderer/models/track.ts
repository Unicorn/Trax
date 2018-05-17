import { Repository } from 'models/repository'

// Constant Names
export const CREATE_TRACK = 'trax/track/CREATE_TRACK'
export const DELETE_TRACK = 'trax/track/DELETE_TRACK'
export const CLEAR_TRACKS = 'trax/track/CLEAR_TRACKS'

export type Track = {
  ident: string;
  repository: Repository;
  project?: any;
  columns?: any;
  labels?: any;
}

export type Tracks = {
  [key: string]: Track;
}

export interface CreateTrack {
  type: typeof CREATE_TRACK;
  track: Track;
}

export interface DeleteTrack {
  type: typeof DELETE_TRACK;
  track: Track;
}

export interface ClearTracks {
  type: typeof CLEAR_TRACKS;
}

export type TrackActions = CreateTrack | DeleteTrack | ClearTracks
