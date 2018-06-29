import * as React from 'react'
import { Repos } from 'models/repo'
import RepoItem from 'views/repos/RepoItem'

interface Props {
  repos: Repos
}

const RepoList: React.SFC<Props> = ({ repos }) => (
  <ul className="masonry thirds list">
    {repos.length > 0 && repos.map(r => (<RepoItem repo={r} />))}
  </ul>
)

export default RepoList
