/** @jsx createElement **/
import { createElement, SFC } from 'react'

interface Props {
  label: {
    color: string
    name: string
  }
}

const LabelItem: SFC<Props> = ({ label }) => (
  <span style={{ backgroundColor: `#${label.color}` }} key={name} className="label">
    {label.name.replace(/[^\w]/gi, '')}
  </span>
)

export default LabelItem
