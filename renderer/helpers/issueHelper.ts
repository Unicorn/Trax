import * as _ from 'lodash'
import * as Fuse from 'fuse.js'
import { Issues, Issue } from 'models/issue'
import { LANES } from 'config/constants'

interface GroupByLane {
  backlog?: Issue[],
  started?: Issue[],
  review?: Issue[],
  complete?: Issue[],
}

export const issuesWithoutLanes = (issues: Issues) => {
  const arr = issuesArray(issues)

  if (arr.length < 1)
    return []

  return arr.filter((i: Issue) => i.labels.filter(l => LANES.includes(l.name)).length === 0)
}

export const issuesArray = (issues: Issues): Issue[] =>  {
  const { result, entities } = issues

  if (!result || result.length < 0 || !entities)
    return []

  return result.map((id: number) => entities.issues[id])
}

export const groupByLane = (issues: Issues): GroupByLane => _.groupBy(issuesArray(issues), (i: Issue) => i.lane)

export const filterIssues = (text: string, issues: Issue[]): Issue[] => {
  console.log("filter issue", issues, text)
  const options = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ['title', 'description', 'number', 'owner', 'repo'],
  }

  const fuse = new Fuse(issues, options)

  return fuse.search(text)
}
