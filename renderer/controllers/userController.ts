import { union, merge } from 'lodash'
import * as UserModel from 'models/user'
import * as GithubModel from 'models/github'
import { Resources, defaultState } from 'models/app'

export const updateUsers = (payload: UserModel.User[]): UserModel.UpdateUsersAction => ({
  type: UserModel.USERS.UPDATE,
  payload
})

export const usersReducer = (state: Resources = defaultState, action: UserModel.UpdateUsersAction): Resources => {
  const { type, payload } = action
  const newState = { ...state }

  switch (type) {
    case GithubModel.GITHUB.USERS.REQUEST:
      newState.isLoading = true
      return newState

    case UserModel.USERS.UPDATE:
      ;(payload as UserModel.User[]).forEach(r => {
        newState.data[r.key] = merge(newState.data[r.key], r)
        newState.keys = union(newState.keys, [r.key])
      })
      newState.isLoading = false
      break

    default:
      return state
  }

  return newState
}
