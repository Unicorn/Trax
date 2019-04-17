import * as React from 'react'
import { Label } from 'models/label'
import LabelItem from './LabelItem'

interface Props {
  labels: Label[]
  withoutLanes: boolean
  lane: string
}

const LabelsList: React.SFC<Props> = ({ labels, withoutLanes, lane }) => {
  const items = withoutLanes ? labels.filter((label: Label) => label.name !== lane) : labels

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
