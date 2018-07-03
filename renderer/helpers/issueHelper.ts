import * as _ from 'lodash'
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

  console.log("issuesArray", result, entities)

  if (!result || result.length < 0 || !entities)
    return []

  return result.map((id: number) => entities.issues[id])
}

export const groupByLane = (issues: Issues): GroupByLane => _.groupBy(issuesArray(issues), (i: Issue) => i.lane)
