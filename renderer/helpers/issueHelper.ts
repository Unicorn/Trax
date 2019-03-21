import * as Fuse from 'fuse.js'
import { Issues, Issue } from 'models'
import { LANES, LABELS, Lane } from 'config/constants'

// export const issuesWithoutLanes = (issues: Issues) => {
//   const arr = issuesArray(issues)
//
//   if (arr.length < 1)
//     return []
//
//   return arr.filter((i: Issue) => i.labels.filter(l => LANES.includes(l.name as Lane)).length === 0)
// }

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
