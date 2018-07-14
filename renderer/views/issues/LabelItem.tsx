import * as React from 'react'
import { Label } from 'models/label'

interface Props {
  label: Label
}

const LabelItem: React.SFC<Props> = ({ label }) => (
  <span style={{ backgroundColor: `#${label.color}` }} key={label.name} className="label">
    {label.name}
  </span>
)

export default LabelItem
