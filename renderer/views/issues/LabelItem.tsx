import { replace } from 'lodash'
import * as React from 'react'

interface Props {
  label: {
    color: string
    name: string
  }
}

const LabelItem: React.SFC<Props> = ({ label }) => {
  let name = replace(label.name, '-', '')

  console.log("label", label)

  return (
    <span style={{ backgroundColor: `#${label.color}` }} key={name} className="label">
      {name}
    </span>
  )
}

export default LabelItem
