import { union, merge } from 'lodash'
import { USERS, Users, User, UpdateUsersAction } from '@/models/user'
import * as GithubModel from '@/models/github'
import { initialState } from '@/models/app'

export const updateUsers = (payload: User[]): UpdateUsersAction => ({
  type: USERS.UPDATE,
  payload
})

export const usersReducer = (state: Users, action: UpdateUsersAction): Users => {
  if (state === undefined) return initialState.users

  const { type, payload } = action

  if (!type || !payload) return state

  const newState = { ...state }

  switch (type) {
    case GithubModel.GITHUB.USERS.REQUEST:
      newState.isLoading = true
      return newState

    case USERS.UPDATE:
      ;(payload as User[]).forEach(r => {
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
