import { intersection } from 'lodash'
import { Label } from '@/models/label'
import { SWIMLANES, LABELS, TYPES, POINTS, PRIORITY } from '@/config/constants'

export const traxLanes = Object.keys(SWIMLANES).map(k => LABELS[k].name)
export const traxLabels = Object.keys(LABELS).map(k => LABELS[k].name)
export const traxPoints = Object.keys(POINTS).map(k => POINTS[k].name)
export const traxPriorities = Object.keys(PRIORITY).map(k => PRIORITY[k].name)
export const traxType = Object.keys(TYPES).map(k => TYPES[k].name)

export const labelsWithoutCore = (labels: Label[]) => {
  return labels.filter((label: Label) => !traxLabels.includes(label.name))
}

export const priorityFromLabels = (labels: Label[]): number => {
  let labelsArr = labels.map(l => l.name)
  let filtered = intersection(labelsArr, traxPriorities)
  return filtered.length > 0 ? filtered[0].length : 0
}

export const pointsFromLabels = (labels: Label[]): number => {
  let labelsArr = labels.map(l => l.name)
  let filtered = intersection(labelsArr, traxPoints)
  return filtered[0] && filtered[0].length || 0
}

export const typeFromLabels = (labels: Label[]): string => {
  let labelsArr = labels.map(l => l.name)
  let filtered = intersection(labelsArr, traxType)
  return filtered[0] ? filtered[0].replace(/[^\w]/gi, '') : ''
}
