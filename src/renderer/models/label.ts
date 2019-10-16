import { defaultLanes } from '@/models/lane'
import { TYPES, PRIORITY, POINTS } from '@/config/constants'

export interface LabelsType {
  [key: string]: {
    label: string
    name: string
    color: string
  }
}

export const LABELS: LabelsType = {
  ...defaultLanes,
  ...TYPES,
  ...PRIORITY,
  ...POINTS
}

export interface Label {
  id: number
  url: string
  name: string
  description: string
  color: string
  default: boolean
}

export type Labels = Label[]
