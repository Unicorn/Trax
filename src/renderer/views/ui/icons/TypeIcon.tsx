import * as React from 'react'

interface Props {
  id?: string
  viewbox?: string
  type: string
}

const EpicIcon: React.SFC<Props> = (props) => {
  const { id, viewbox, type } = props

  const types: any = {
    epic: <path d="M0,16 L19,16 C20.6568542,16 22,17.3431458 22,19 C22,20.6568542 20.6568542,22 19,22 L0,22 L0,16 Z M0,0 L19,0 C20.6568542,-3.04359188e-16 22,1.34314575 22,3 C22,4.65685425 20.6568542,6 19,6 L0,6 L0,0 Z M0,32 L19,32 C20.6568542,32 22,33.3431458 22,35 C22,36.6568542 20.6568542,38 19,38 L0,38 L0,32 Z" />,
    story: <path d="M0,0 L19,0 C20.6568542,-3.04359188e-16 22,1.34314575 22,3 C22,4.65685425 20.6568542,6 19,6 L0,6 L0,0 Z M0,32 L19,32 C20.6568542,32 22,33.3431458 22,35 C22,36.6568542 20.6568542,38 19,38 L0,38 L0,32 Z" />,
    feature: <path d="M0,16 L19,16 C20.6568542,16 22,17.3431458 22,19 L22,19 C22,20.6568542 20.6568542,22 19,22 L0,22 L0,16 Z" />,
    bug: <path d="M0,16 L19,16 C20.6568542,16 22,17.3431458 22,19 L22,19 C22,20.6568542 20.6568542,22 19,22 L0,22 L0,16 Z" />
  }

  return (
    <svg id={id} version="1.1" viewBox={viewbox} xmlns="http://www.w3.org/2000/svg" fillOpacity="0.5">
      {types[type]}
    </svg>
  )
}

EpicIcon.defaultProps = {
  viewbox: '0 0 22 38'
}

export default EpicIcon
