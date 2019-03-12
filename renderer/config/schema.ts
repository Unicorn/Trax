import { schema } from 'normalizr'
import { Issue } from 'models/issue'
import { LANES, Lane } from 'config/constants'

const userSchema = new schema.Entity('users')
const assigneeSchema = new schema.Entity('assignees')

const repoSchema = new schema.Entity('repos')

const orgSchema = new schema.Entity('orgs')

const milestoneSchema = new schema.Entity('milestones', {
  creator: userSchema
})

const issueSchema = new schema.Entity(
  'issues',
  {
    assignee: userSchema,
    assignees: [userSchema],
    milestone: milestoneSchema,
    user: userSchema,
  },
  {
    processStrategy: (issue: Issue, _parent, _key) => {
      let labels = issue.labels.filter(l => LANES.includes(l.name as Lane))

      return {
        ...issue,
        lane: labels.length > 0 ? labels[0].name : 'backlog'
      }
    }
  }
)

export default {
  assignee: assigneeSchema,
  assignees: [assigneeSchema],
  user: userSchema,
  repo: repoSchema,
  repos: [repoSchema],
  issue: issueSchema,
  issues: [issueSchema],
  org: orgSchema,
}
