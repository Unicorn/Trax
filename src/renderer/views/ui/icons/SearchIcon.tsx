/** @jsx createElement **/
import { createElement, SFC } from 'react'

interface Props {
  id?: string
  viewbox?: string
}

const SearchIcon: SFC<Props> = props => {
  const { id, viewbox } = props

  return (
    <svg id={id} version="1.1" viewBox={viewbox} xmlns="http://www.w3.org/2000/svg">
      <path d="m43 14c-15.98 0-29 13.02-29 29s13.02 29 29 29c6.9102 0 13.258-2.4414 18.25-6.5l19.625 19.625c1.1719 1.1719 3.0781 1.1719 4.25 0s1.1719-3.0469 0-4.2188l-19.625-19.625c4.0664-4.9922 6.5-11.363 6.5-18.281 0-15.98-13.02-29-29-29zm0 6c12.738 0 23 10.262 23 23s-10.262 23-23 23-23-10.262-23-23 10.262-23 23-23z" />
    </svg>
  )
}

SearchIcon.defaultProps = {
  viewbox: '0 0 100 100'
}

export default SearchIcon
