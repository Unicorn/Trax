import { union, merge } from 'lodash'
import { defaultState, Resources } from 'models/app'
import * as RepoModel from 'models/repo'
import * as GithubModel from 'models/github'

export const updateRepos = (payload: RepoModel.Repo[]): RepoModel.UpdateReposAction => ({
  type: RepoModel.REPOS.UPDATE,
  payload
})

export const reposReducer = (state: Resources = defaultState, action: RepoModel.RepoActions): Resources => {
  const { type, payload } = action
  const newState = { ...state }

  switch (type)
  {
    case GithubModel.GITHUB.REPOS.REQUEST :
      newState.isLoading = true
      return newState

    case RepoModel.REPOS.UPDATE :
      (payload as RepoModel.Repo[]).forEach(repo => {
        newState.data[repo.key] = merge(newState.data[repo.key], repo)
        newState.keys = union(newState.keys, [repo.key])
      })
      newState.isLoading = false
      break

    default :
      return state
  }

  return newState
}
