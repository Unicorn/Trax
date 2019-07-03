/** @jsx createElement **/
import { createElement, SFC } from 'react'
import { Label } from '@/models/label'
import LabelItem from './LabelItem'
import { labelsWithoutCore, traxPriorities, traxPoints, traxLanes } from '@/helpers/labelHelper'

interface Props {
  labels: Label[]
  filter?: string[]
  filterCore?: boolean
}

const LabelsList: SFC<Props> = ({ labels, filter, filterCore }) => {
  let items = filterCore ? labelsWithoutCore(labels) : labels

  if (filter && filter.includes('lanes')) items = items.filter((label: Label) => !traxLanes.includes(label.name))

  if (filter && filter.includes('priority')) items = items.filter((label: Label) => !traxPriorities.includes(label.name))

  if (filter && filter.includes('points')) items = items.filter((label: Label) => !traxPoints.includes(label.name))

  if (items.length > 0)
    return (
      <div className="labels">
        {items.map((label: Label, i: number) => (
          <LabelItem key={`${label.name}-${i}`} label={label} />
        ))}
      </div>
    )
  else return null
}

export default LabelsList
