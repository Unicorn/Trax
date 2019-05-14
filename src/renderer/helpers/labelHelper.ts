import { intersection } from 'lodash'
import { Label } from '@/models/label'
import { LABELS, TYPES, POINTS } from '@/config/constants'

const traxLabels = Object.keys(LABELS).map(k => LABELS[k].name)
const traxPoints = Object.keys(POINTS).map(k => POINTS[k].name)
const traxType = Object.keys(TYPES).map(k => TYPES[k].name)

export const labelsWithoutCore = (labels: Label[]) => {
  return labels.filter((label: Label) => !traxLabels.includes(label.name))
}

export const pointsFromLabels = (labels: Label[]): number => {
  let labelsArr = labels.map(l => l.name)
  let filtered = intersection(labelsArr, traxPoints)
  return filtered[0] && filtered[0].length || 0
}

export const typeFromLabels = (labels: Label[]): string => {
  let labelsArr = labels.map(l => l.name)
  let filtered = intersection(labelsArr, traxType)
  return filtered[0] ? filtered[0].replace(/[^\w]/gi, '') : 'N'
}
