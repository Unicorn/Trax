/** @jsx createElement */
import { createElement, FC } from 'react'
import { UI } from 'horseshoes'
import { Tracks, Track } from '@/models/track'
import { Users, User } from '@/models/user'
import { toOptions } from 'horseshoes'

interface Props {
  repo: string
  assignee: string
  tracks: Tracks
  users: Users
  repoHandler: (value: string) => void
  assigneeHandler: (value: string) => void
}

const FilterIssues: FC<Props> = ({ repo, assignee, tracks, users, repoHandler, assigneeHandler }) => {
  return (
    <header className="filter">
      <p>Filter Issues:</p>
      <UI.form.SelectField
        name="repo"
        type="select"
        label="Repo"
        options={toOptions<Track>(tracks, 'ident')}
        onChange={({ currentTarget: { value } }) => repoHandler(value)}
        selected={repo}
        value={repo}
        required
      />

      <UI.form.SelectField
        name="assignee"
        type="select"
        label="Assignee"
        options={toOptions<User>(users, 'login')}
        onChange={({ currentTarget: { value } }) => assigneeHandler(value)}
        selected={assignee}
        value={assignee}
        required
      />
    </header>
  )
}

export default FilterIssues
