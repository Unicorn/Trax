import { schema } from 'normalizr'
import { Issue } from 'models/issue'
import { LANES, Lane } from 'config/constants'
import { Timers } from 'models/timer'
import { Repos } from 'models/Repo'

export interface FetchedDataSchema {
  isLoading: boolean
  entities: {
    [key: string]: any
  }
  nextPageUrl?: string
  result: number
}

export const fetchDefaultState: FetchedDataSchema = {
  isLoading: false,
  entities: {
    issues: {},
    repos: {}
  },
  result: 0
}

export interface AppState {
  timers: Timers
  repos: Repos
}

const userSchema = new schema.Entity('users')
const assigneeSchema = new schema.Entity('assignees')

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

const repoSchema = new schema.Entity('repos')

const trackSchema = new schema.Entity(
  'tracks',
  {
    repo: repoSchema,
    issues: [issueSchema],
    users: [userSchema]
  }
)

export const scheme = {
  assignee: assigneeSchema,
  assignees: [assigneeSchema],
  user: userSchema,
  repo: repoSchema,
  repos: [repoSchema],
  issue: issueSchema,
  issues: [issueSchema],
  org: orgSchema,
  tracks: trackSchema
}
