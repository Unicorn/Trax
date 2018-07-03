import { Issues, Issue } from 'models/issue'
import { SWIMLANES } from 'config/constants'

export const issuesWithoutLanes = (issues: Issues) => {
  let lanes = [
    SWIMLANES.backlog.name,
    SWIMLANES.started.name,
    SWIMLANES.review.name,
    SWIMLANES.complete.name,
  ]

  const arr = issuesArray(issues)

  if (arr.length < 1)
    return []

  return arr.filter((i: Issue) => i.labels.filter(l => lanes.includes(l)).length === 0)
}

export const issuesArray = (issues: Issues) =>  {
  const { result, entities } = issues

  if (!result || result.length < 0 || !entities)
    return []

  return result.map((id: number) => entities.issues[id])
}
