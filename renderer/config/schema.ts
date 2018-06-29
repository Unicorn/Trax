import { schema } from 'normalizr'

const userSchema = new schema.Entity('users', undefined, {
  idAttribute: 'login'
})

const repoSchema = new schema.Entity('repos', undefined, {
  idAttribute: 'fullName'
})

repoSchema.define({
  owner: userSchema
})

const orgSchema = new schema.Entity('orgs', undefined, {
  idAttribute: 'login'
})

orgSchema.define({
  owner: userSchema
})

export default {
  user: userSchema,
  repo: repoSchema,
  org: orgSchema,
}
