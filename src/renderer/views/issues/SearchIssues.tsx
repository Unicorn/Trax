/** @jsx createElement **/
import { createElement, SFC } from 'react'

interface Props {
  search: string
  searchHandler: (value: string) => void
}

const SearchIssues: SFC<Props> = ({ search, searchHandler }) => (
  <header className="search">
    <input type="text" placeholder="Search for tasks..." value={search} onChange={({ currentTarget: { value } }) => searchHandler(value)} />
  </header>
)

export default SearchIssues
