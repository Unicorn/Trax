import * as React from 'react'

interface Props {
  handler: (e: React.ChangeEvent<HTMLInputElement>) => any
}

const SearchIssues: React.SFC<Props> = ({ handler }) => (
  <header className="search">
    <input
      type="text"
      placeholder="Search for tasks..."
      onChange={handler}
    />
  </header>
)

export default SearchIssues