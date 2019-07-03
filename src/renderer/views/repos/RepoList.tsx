/** @jsx createElement **/
import { createElement, SFC, ReactNode } from 'react'
import { connect } from 'react-redux'

import { Repos, Repo } from '@/models/repo'
import { RootState } from '@/models/app'
import RepoItem from '@/views/repos/RepoItem'
import Loadable from '@/views/ui/Loadable'

interface Props {
  repoIds?: string[]
}

interface Connected {
  repos: Repos
}

const sortByRepoName = (a: Repo, b: Repo): number => {
  let aName = a.fullName.toLowerCase()
  let bName = b.fullName.toLowerCase()

  return aName < bName ? -1 : aName > bName ? 1 : 0
}

const RepoList: SFC<Props & Connected> = ({ repos, repoIds }) => {
  const _renderRepos = (): ReactNode => {
    if (!repoIds || repoIds.length < 1) return null

    let sorted = repoIds.map(id => repos.data[id]).sort(sortByRepoName)

    return sorted.map((repo: Repo) => repo && <RepoItem repo={repo} key={repo.key} />)
  }

  return (
    <Loadable widgetName="repo-list" isLoading={repos.isLoading === true}>
      <ul>{_renderRepos()}</ul>
    </Loadable>
  )
}

const mapState = (state: RootState): Connected => ({
  repos: state.repos
})

export default connect(mapState)(RepoList)
