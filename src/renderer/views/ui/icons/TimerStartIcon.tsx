import * as React from 'react'

type TIconProps = {
  id?: string;
  viewbox?: string;
  color?: string;
}

const TimerStartIcon: React.SFC<TIconProps> = (props) => {
  const { id, viewbox, color } = props

  return (
    <svg id={id} version="1.1" viewBox={viewbox} xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="23" />
      <path
        d="M37.415,22.5731112 L18.418,10.3301112 C17.291,9.72311118 16,9.78611118 16,11.9651112 L16,36.0731112 C16,38.0651112 17.385,38.3791112 18.418,37.7081112 L37.415,25.4651112 C38.197,24.6661112 38.197,23.3721112 37.415,22.5731112"
        fill={color}
      />
    </svg>
  )
}

TimerStartIcon.defaultProps = {
  color: '#fff',
  viewbox: '0 0 100 100'
}

export default TimerStartIcon
