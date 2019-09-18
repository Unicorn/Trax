/** @jsx createElement */
import { createElement, FC } from 'react'
import { connect } from 'react-redux'

import Select from 'react-select'

import { Tracks } from '@/models/track'
import { RootState } from '@/models/app'
import { Issues } from '@/models/issue'

interface Connected {
  tracks: Tracks
  issues: Issues
}

interface SelectOption {
  label: string
  value: string
  color?: string
}

const FilterIssues: FC<Connected> = ({ tracks, issues }) => {

  const _renderRepoFilter = (options: Tracks) => {

    const selectOptions: SelectOption[] = []

    options.keys.map((key) => {
      selectOptions.push({ label: options.data[key].ident, value: options.data[key].ident })
    })

    return (
      <Select 
        placeholder="Filter by repository..."
        options={selectOptions}
        isMulti
      />
    )
  }

  const _renderLabelFilter = (options: Issues) => {

    const labels: string[] = []
    const selectOptions: SelectOption[] = []

    options.keys.map((key) => {
      options.data[key].labels.map((label) => {
        if (labels.indexOf(label.name) < 0) { 
          labels.push(label.name)
          selectOptions.push({ value: label.name, label: label.name, color: "#" + label.color })
        }
      })
    })

    return (
      <Select 
        placeholder="Filter by label..."
        options={selectOptions}
        isMulti
      />
    )
  }

  return (
    <div>
      { _renderRepoFilter(tracks) }
      { _renderLabelFilter(issues) }
    </div>
  )
}

const mapToState = (state: RootState): Connected => ({
  tracks: state.tracks,
  issues: state.issues
})



export default connect(mapToState, null)(FilterIssues)