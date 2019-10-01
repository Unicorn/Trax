import { normalizePayload } from 'horseshoes'
import { union, merge } from 'lodash'
import { ORGS, ORG, Orgs, Org, UpdateOrgAction, UpdateOrgsAction, UpdateOrgPayload, OrgActions } from '@/models/org'
import * as GithubModel from '@/models/github'
import { Repo } from '@/models/repo'

export const updateOrgs = (payload: Org[]): UpdateOrgsAction => ({
  type: ORGS.UPDATE,
  payload
})

export const updateOrgRepos = (payload: UpdateOrgPayload): UpdateOrgAction => ({
  type: ORG.UPDATE_REPOS,
  payload: {
    key: payload.key,
    data: normalizePayload(payload.data) as Repo[]
  }
})

const initialState: Orgs = {
  isLoading: false,
  keys: ['personal'],
  error: false,
  errorTrace: {},
  data: {
    personal: {
      id: 0,
      key: 'personal',
      avatarUrl: '',
      name: '',
      htmlUrl: '',
      login: 'personal',
      nodeId: 'personal'
    }
  }
}

export const orgsReducer = (state: Orgs = initialState, action: OrgActions): Orgs => {
  const { type, payload } = action

  if (!type || !payload) return state

  const newState = { ...state }

  switch (type) {
    case GithubModel.GITHUB.ORGS.REQUEST:
      newState.isLoading = true
      return newState

    case ORGS.UPDATE:
      ;(payload as Org[]).forEach(org => {
        newState.data[org.key] = merge(newState.data[org.key], org)
        newState.keys = union(newState.keys, [org.key])
      })
      newState.isLoading = false
      break

    case ORG.UPDATE_REPOS:
      const p = payload as UpdateOrgPayload
      const repoIds = p.data.map((r: Repo) => r.nodeId)
      const existingRepoIds = (newState.data[p.key] && newState.data[p.key].repoIds) || []
      newState.data[p.key].repoIds = union(existingRepoIds, repoIds)
      newState.isLoading = false
      return newState

    default:
      return state
  }

  return newState
}
