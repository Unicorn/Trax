import * as React from 'react'
import { Repos } from 'models/repo'
import RepoItem from 'views/repos/RepoItem'
import Loadable from 'views/ui/Loadable'

interface Props {
  repos: Repos
}

const RepoList: React.SFC<Props> = ({ repos }) => (
  <Loadable widgetName="repo-list" isLoading={repos.isLoading}>
    <ul className="masonry thirds list">
      {repos.entities.length > 0 && repos.entities.map(r => (<RepoItem repo={r} />))}
    </ul>
  </Loadable>
)

export default RepoList
