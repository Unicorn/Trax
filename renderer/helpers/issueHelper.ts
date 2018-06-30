import { Issues } from 'models/issue'
import { SWIMLANES } from 'config/constants'

export const filterIssuesWithoutLanes = (issues: Issues) => {
  let filterCriteria = [
    SWIMLANES.backlog.name,
    SWIMLANES.started.name,
    SWIMLANES.review.name,
    SWIMLANES.complete.name,
  ]

  return issues.filter(i => i.labels.filter(l => filterCriteria.includes(l.name)).length === 0)
}
