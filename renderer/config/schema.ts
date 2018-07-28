import { schema } from 'normalizr'
import { Issue } from 'models/issue'
import { LANES } from 'config/constants'

const userSchema = new schema.Entity('users');

const repoSchema = new schema.Entity('repos');

const orgSchema = new schema.Entity('orgs');

const milestoneSchema = new schema.Entity('milestones', {
  creator: userSchema
});

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
      var lane = 'backlog'

      if (issue.labels && issue.labels.length > 0)
        lane = issue.labels.filter(l => LANES.includes(l.name))[0].name

      return {
        ...issue,
        lane
      }
    }
  }
);

export default {
  user: userSchema,
  repo: repoSchema,
  repos: [repoSchema],
  issue: issueSchema,
  issues: [issueSchema],
  org: orgSchema,
}
