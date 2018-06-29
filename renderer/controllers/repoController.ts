import { REPO, Repos, ReposAction } from 'models/repo'

export const requestUserRepos = (): ReposAction => ({
  type: REPO.REQUEST,
})

export const requestOrgRepos = (login: string): ReposAction => ({
  type: REPO.REQUEST,
  login
})

export const receiveRepos = (payload: Repos): ReposAction => ({
  type: REPO.SUCCESS,
  payload
})

export const reposReducer = (state: Repos = [], action: ReposAction): Repos => {
  const { payload, type } = action

  switch (type)
  {
    case REPO.SUCCESS :
      return payload || state

    default :
      return state
  }
}
