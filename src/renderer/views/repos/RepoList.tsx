import * as React from 'react'
import { connect } from 'react-redux'

import { AppState, Resources } from '@/models/app'
import { Repo } from '@/models/repo'
import RepoItem from '@/views/repos/RepoItem'
import Loadable from '@/views/ui/Loadable'

interface Props {
  repos: Resources
  repoIds?: string[]
}

const sortByRepoName = (a: any, b: any) => {
  let aName = a.fullName.toLowerCase()
  let bName = b.fullName.toLowerCase()

  return aName < bName ? -1 : aName > bName ? 1 : 0
}

const RepoList: React.SFC<Props> = ({ repos, repoIds }) => {

  const _renderRepos = () => {
    if (!repoIds || repoIds.length < 1)
      return null

    let sorted = repoIds.map(id => repos.data[id]).sort(sortByRepoName)

    return sorted.map((repo: Repo) => repo && <RepoItem repo={repo} key={repo.key} />)
  }

  return (
    <Loadable widgetName="repo-list" isLoading={repos.isLoading}>
      <ul>
        {_renderRepos()}
      </ul>
    </Loadable>
  )
}

const mapState = (state: AppState) => ({
  repos: state.repos
})

export default connect(mapState)(RepoList)
