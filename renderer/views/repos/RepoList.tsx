import * as React from 'react'
import { Repos } from 'models/repo'
import RepoItem from 'views/repos/RepoItem'
import Loadable from 'views/ui/Loadable'

interface Props {
  repos: Repos
}

const renderRepos = (repos: Repos): React.ReactNode => {
  const { result, entities } = repos

  if(!result || result.length < 1 || !entities)
    return null

  return result.map(id => <RepoItem repo={repos.entities!.repos[id]} />)
}

const RepoList: React.SFC<Props> = ({ repos }) => (
  <Loadable widgetName="repo-list" isLoading={repos.isLoading}>
    <ul className="table list">
      {renderRepos(repos)}
    </ul>
  </Loadable>
)

export default RepoList
