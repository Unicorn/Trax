import * as Fuse from 'fuse.js'
import { Issue } from '@/models/issue'
import { LABELS } from '@/models/label'
import { pointsFromLabels } from '@/helpers/labelHelper'

export const filterIssues = (text: string, issues: readonly Issue[]): Issue[] => {
  const options = {
    shouldSort: true,
    threshold: 0.5,
    location: 0,
    distance: 10,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ['title', 'number', 'repo']
  }

  const fuse = new Fuse(issues, options)

  return fuse.search(text)
}

export const labelNames = (labels: string[]): string[] => {
  return labels.filter(l => l !== '').map(l => LABELS[l].name)
}

export const totalPoints = (issues: Issue[]): string => {
  if (issues.length < 1) return ''
  const total = issues.map(i => pointsFromLabels(i.labels)).reduce((prev, curr) => prev + curr)
  return `${total} pts`
}
