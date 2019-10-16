import { updateResources } from 'horseshoes'
import { initialState } from '@/models/app'
import { Repos, Repo, REPOS, RepoActions, UpdateReposAction } from '@/models/repo'
import * as GithubModel from '@/models/github'

export const updateRepos = (payload: Repo[]): UpdateReposAction => ({
  type: REPOS.UPDATE,
  payload
})

export const reposReducer = (state: Repos = initialState.repos, action: RepoActions): Repos => {
  const { type, payload } = action

  if (!type || !payload) return state

  const newState = { ...state }

  switch (type) {
    case GithubModel.GITHUB.REPOS.REQUEST:
      newState.isLoading = true
      return newState

    case REPOS.UPDATE:
      return updateResources<Repo>(state, payload)

    default:
      return state
  }
}
