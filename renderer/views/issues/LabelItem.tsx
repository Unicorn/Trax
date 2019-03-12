import { replace } from 'lodash'
import * as React from 'react'
import { Label } from 'models/label'

interface Props {
  label: Label
}

const LabelItem: React.SFC<Props> = ({ label }) => {
  let name = replace(label.name, '-', '')

  return (
    <span style={{ backgroundColor: `#${label.color}` }} key={name} className="label">
      {name}
    </span>
  )
}

export default LabelItem
