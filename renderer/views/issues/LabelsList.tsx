import * as React from 'react'
import { Label } from 'models/label'
import LabelItem from './LabelItem'
import { labelsWithoutCore } from 'helpers/labelHelper'

interface Props {
  labels: Label[]
  filterCoreLabels: boolean
}

const LabelsList: React.SFC<Props> = ({ labels, filterCoreLabels }) => {
  const items = filterCoreLabels ? labelsWithoutCore(labels) : labels

  if (items.length > 0)
    return (
      <div className="labels">
        {items.map((label: Label, i: number) => <LabelItem key={`${label.name}-${i}`} label={label} />)}
      </div>
    )
  else
    return null
}

export default LabelsList
