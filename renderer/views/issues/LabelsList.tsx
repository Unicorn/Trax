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

  return (
    <div className="labels">
      {items.map((label: Label) => <LabelItem label={label} />)}
    </div>
  )

}

export default LabelsList
