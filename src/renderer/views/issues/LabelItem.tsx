import * as React from 'react'

interface Props {
  label: {
    color: string
    name: string
  }
}

const LabelItem: React.SFC<Props> = ({ label }) => (
  <span style={{ backgroundColor: `#${label.color}` }} key={name} className="label">
    {label.name.replace(/[^\w]/gi, '')}
  </span>
)

export default LabelItem
