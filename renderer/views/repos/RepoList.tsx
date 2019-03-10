import * as React from 'react'
import { denormalize } from 'normalizr'
import { Repos, Repo } from 'models/repo'
import RepoItem from 'views/repos/RepoItem'
import Loadable from 'views/ui/Loadable'
import schema from 'config/schema'

interface Props {
  repos: Repos
}

const sortByRepoName = (a: any, b: any) => {
  let aName = a.fullName.toLowerCase()
  let bName = b.fullName.toLowerCase()

  return aName < bName ? -1 : aName > bName ? 1 : 0
}

const renderRepos = (repos: Repos): React.ReactNode => {
  const { result, entities } = repos

  if (!result || result.length < 1 || !entities)
    return null

  const sorted = denormalize(result, schema.repos, entities).sort(sortByRepoName)

  return sorted.map((repo: Repo) => <RepoItem repo={repo} />)
}

const RepoList: React.SFC<Props> = ({ repos }) => (
  <Loadable widgetName="repo-list" isLoading={repos.isLoading}>
    <ul>
      {renderRepos(repos)}
    </ul>
  </Loadable>
)

export default RepoList
