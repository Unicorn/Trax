import { COLORS } from '@/config/constants'

export enum LANE {
  SET_VISIBILITY = 'trax/lanes/SET_VISIBILITY'
}

export type LaneTypes = 'backlog' | 'sprint' | 'started' | 'review' | 'complete'

export interface Lane {
  label: string
  name: LaneTypes
  color: string
  visible: boolean
  collapsed: boolean
}

export type Lanes = {
  [key in LaneTypes]: Lane;
}

interface SetVisibility {
  lane: LaneTypes
  visible: boolean
}

export interface LanesAction {
  type: LANE,
  payload?: SetVisibility
}

export const laneTypes: LaneTypes[] = ['backlog', 'sprint', 'started', 'review', 'complete']

export const defaultLanes: Lanes = {
  backlog: {
    label: 'Backlog',
    name: 'backlog',
    color: COLORS.pink,
    visible: true,
    collapsed: false
  },
  sprint: {
    label: 'Sprint',
    name: 'sprint',
    color: COLORS.cyan,
    visible: true,
    collapsed: false
  },
  started: {
    label: 'Started',
    name: 'started',
    color: COLORS.orange,
    visible: true,
    collapsed: false
  },
  review: {
    label: 'Review',
    name: 'review',
    color: COLORS.blue,
    visible: true,
    collapsed: false
  },
  complete: {
    label: 'Complete',
    name: 'complete',
    color: COLORS.green,
    visible: true,
    collapsed: true
  }
}

export const visibleLanes = (lanes: Lanes): LaneTypes[] => laneTypes.filter(l => lanes[l].visible)