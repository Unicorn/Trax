import { schema } from 'normalizr'

const userSchema = new schema.Entity('users');

const repoSchema = new schema.Entity('repos');

const orgSchema = new schema.Entity('orgs');

const labelSchema = new schema.Entity('labels', {}, { idAttribute: 'name' });

const milestoneSchema = new schema.Entity('milestones', {
  creator: userSchema
});

const issueSchema = new schema.Entity(
  'issues',
  {
    assignee: userSchema,
    assignees: [userSchema],
    labels: [labelSchema],
    milestone: milestoneSchema,
    user: userSchema,
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
