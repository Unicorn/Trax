import { union, merge } from 'lodash'
import { initialState } from '@/models/app'
import { Repos, Repo, REPOS, RepoActions, UpdateReposAction } from '@/models/repo'
import * as GithubModel from '@/models/github'

export const updateRepos = (payload: Repo[]): UpdateReposAction => ({
  type: REPOS.UPDATE,
  payload
})

export const reposReducer = (state: Repos, action: RepoActions): Repos => {
  if (state === undefined) return initialState.repos

  const { type, payload } = action

  if (!type || !payload) return state

  const newState = { ...state }

  switch (type) {
    case GithubModel.GITHUB.REPOS.REQUEST:
      newState.isLoading = true
      return newState

    case REPOS.UPDATE:
      ;(payload as Repo[]).forEach(repo => {
        newState.data[repo.key] = merge(newState.data[repo.key], repo)
        newState.keys = union(newState.keys, [repo.key])
      })
      newState.isLoading = false
      break

    default:
      return state
  }

  return newState
}
