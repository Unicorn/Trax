import { Resources, Resource } from 'horseshoes'
import { OptionsObject } from '@/views/ui/form'

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

export const tracksReposOptions = (tracks: Tracks): OptionsObject => {
  const options: OptionsObject = {}

  tracks.keys.forEach(key => {
    options[tracks.data[key].ident] = {
      label: tracks.data[key].ident
    }
  })

  return options
}