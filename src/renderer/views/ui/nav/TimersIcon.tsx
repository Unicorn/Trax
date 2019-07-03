/** @jsx createElement **/
import { createElement, SFC } from 'react'

interface Props {
  id?: string
  viewbox?: string
}

const TimersIcon: SFC<Props> = props => {
  const { id, viewbox } = props

  return (
    <svg id={id} version="1.1" viewBox={viewbox} xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(-154.000000, -599.000000)">
        <path d="M204,599 C231.6125,599 254,621.3875 254,649 C254,676.6125 231.6125,699 204,699 C176.3875,699 154,676.6125 154,649 C154,621.3875 176.3875,599 204,599 Z M204,614.5 C202.618125,614.5 201.5,615.618163 201.5,617 L201.5,650.985 L179.235,673.21125 C178.258438,674.187812 178.258438,675.789375 179.235,676.766 C180.211563,677.742625 181.813125,677.742562 182.78975,676.766 L205.7585,653.7585 C206.2126,653.3044 206.500688,652.689162 206.500688,652.00075 L206.500688,617.00075 C206.500688,615.618875 205.382525,614.50075 204.000688,614.50075 L204,614.5 Z" />
      </g>
    </svg>
  )
}

TimersIcon.defaultProps = {
  viewbox: '0 0 100 100'
}

export default TimersIcon
