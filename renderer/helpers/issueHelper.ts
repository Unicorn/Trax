import * as Fuse from 'fuse.js'
import { Issue } from 'models/issue'
import { LABELS } from 'config/constants'

export const filterIssues = (text: string, issues: Issue[]): Issue[] => {
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

export const labelNames = (labels: string[]) => {
  return labels.filter(l => l !== '').map(l => LABELS[l].name)
}
