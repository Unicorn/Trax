/** @jsx createElement */
import { createElement, FC } from 'react'

import Select from 'react-select'

import { Tracks } from '@/models/track'
import { Issues } from '@/models/issue'

interface Props {
  tracks: Tracks
  issues: Issues
}

interface SelectOption {
  label: string
  value: string
  color?: string
}

export const FilterIssues: FC<Props> = ({ tracks, issues }) => {
  const _renderRepoFilter = (options: Tracks) => {
    const selectOptions: SelectOption[] = []

    options.keys.map(key => {
      selectOptions.push({ label: options.data[key].ident, value: options.data[key].ident })
    })

    return <Select placeholder="Filter by repository..." options={selectOptions} isMulti />
  }

  const _renderLabelFilter = (options: Issues) => {
    const labels: string[] = []
    const selectOptions: SelectOption[] = []

    options.keys.map(key => {
      options.data[key].labels.map(label => {
        if (labels.indexOf(label.name) < 0) {
          labels.push(label.name)
          selectOptions.push({ value: label.name, label: label.name, color: '#' + label.color })
        }
      })
    })

    return <Select placeholder="Filter by label..." options={selectOptions} isMulti />
  }

  return (
    <div>
      {_renderRepoFilter(tracks)}
      {_renderLabelFilter(issues)}
    </div>
  )
}
