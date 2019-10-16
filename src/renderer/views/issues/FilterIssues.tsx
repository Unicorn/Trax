/** @jsx createElement */
import { createElement, FC, useState, FormEvent } from 'react'
import { Tracks, tracksReposOptions } from '@/models/track'
import Form from '@/views/ui/form'

interface Props {
  tracks: Tracks
  repoSelectHandler: (ident: string) => void
}

const FilterIssues: FC<Props> = ({ tracks, repoSelectHandler }) => {
  const [_ident, _setIdent] = useState('')

  const _repoSelectHandler = ({ currentTarget: { value } }: FormEvent<HTMLSelectElement>): void => {
    _setIdent(value)
    repoSelectHandler(value)
  }

  return (
    <header className="filter">
      <p>Filter Issues:</p>
      <Form.SelectField
        name="ident"
        type="select"
        label="Repo"
        options={tracksReposOptions(tracks)}
        onChange={_repoSelectHandler}
        selected={_ident}
        value={_ident}
        required
      />
    </header>
  )
}


export default FilterIssues