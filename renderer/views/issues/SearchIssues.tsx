import * as React from 'react'

interface Props {
  handler: (e: React.ChangeEvent<HTMLInputElement>) => any
}

const SearchIssues: React.SFC<Props> = ({ handler }) => (
  <input
    type="text"
    placeholder="Search for tasks..."
    onChange={handler}
  />
)

export default SearchIssues
