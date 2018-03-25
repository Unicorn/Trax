import * as React from 'react'

type TIconProps = {
  id?: string;
  viewbox?: string;
  color?: string;
}

const TimerStopIcon: React.SFC<TIconProps> = (props) => {
  const { id, viewbox, color } = props

  return (
    <svg id={id} version="1.1" viewBox={viewbox} xmlns="http://www.w3.org/2000/svg">
      <circle stroke={color} strokeWidth="2" cx="24" cy="24" r="23" />
      <path
        d="M33.4285714,13 L14.5714286,13 C13.704,13 13,13.704 13,14.5714286 L13,33.4285714 C13,34.296 13.704,35 14.5714286,35 L33.4285714,35 C34.296,35 35,34.296 35,33.4285714 L35,14.5714286 C35,13.704 34.296,13 33.4285714,13"
        fill={color}
      />
    </svg>
  )
}

TimerStopIcon.defaultProps = {
  color: '#fff',
  viewbox: '0 0 100 100'
}

export default TimerStopIcon
