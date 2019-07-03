/** @jsx createElement **/
import { createElement, SFC } from 'react'

interface Props {
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchIssues: SFC<Props> = ({ handler }) => (
  <header className="search">
    <input type="text" placeholder="Search for tasks..." onChange={handler} />
  </header>
)

export default SearchIssues
