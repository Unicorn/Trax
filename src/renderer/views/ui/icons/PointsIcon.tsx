import * as React from 'react'

interface Props {
  id?: string
  className?: string
  viewbox?: string
  points: number
}

const PointsIcon: React.SFC<Props> = (props) => {
  const { id, className, viewbox, points } = props

  return (
    <svg id={id} className={className} version="1.1" viewBox={viewbox} xmlns="http://www.w3.org/2000/svg">
      <rect fillOpacity={points >= 1 ? 1 : .4} x="0" y="0" width="2" height="12" rx="1"></rect>
      <rect fillOpacity={points >= 2 ? 1 : .4} x="6" y="0" width="2" height="12" rx="1"></rect>
      <rect fillOpacity={points >= 3 ? 1 : .4} x="12" y="0" width="2" height="12" rx="1"></rect>
      <rect fillOpacity={points >= 4 ? 1 : .4} x="18" y="0" width="2" height="12" rx="1"></rect>
      <rect fillOpacity={points >= 5 ? 1 : .4} x="24" y="0" width="2" height="12" rx="1"></rect>
    </svg>
  )
}

PointsIcon.defaultProps = {
  viewbox: '0 0 26 12'
}

export default PointsIcon
