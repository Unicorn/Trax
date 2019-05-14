import { union, merge } from 'lodash'
import * as OrgModel from '@/models/org'
import * as GithubModel from '@/models/github'
import { Repo } from '@/models/repo'
import { Resources, defaultState, normalizePayload } from '@/models/app'

export const updateOrgs = (payload: OrgModel.Org[]): OrgModel.UpdateOrgsAction => ({
  type: OrgModel.ORGS.UPDATE,
  payload
})

export const updateOrgRepos = (payload: OrgModel.UpdateOrgPayload): OrgModel.UpdateOrgAction => ({
  type: OrgModel.ORG.UPDATE_REPOS,
  payload: {
    key: payload.key,
    data: normalizePayload(payload.data)
  }
})

const initialState = {
  ...defaultState,
  keys: ['personal'],
  data: {
    personal: {
      login: 'personal',
      nodeId: 'personal'
    }
  }
}

export const orgsReducer = (state: Resources = initialState, action: OrgModel.OrgActions): OrgModel.Orgs => {
  const { type, payload } = action

  if (!type || !payload) return state

  const newState = { ...state }

  switch (type) {
    case GithubModel.GITHUB.ORGS.REQUEST:
      newState.isLoading = true
      return newState

    case OrgModel.ORGS.UPDATE:
      ;(payload as OrgModel.Org[]).forEach(org => {
        newState.data[org.key] = merge(newState.data[org.key], org)
        newState.keys = union(newState.keys, [org.key])
      })
      newState.isLoading = false
      break

    case OrgModel.ORG.UPDATE_REPOS:
      let p = payload as OrgModel.UpdateOrgPayload
      let repoIds = p.data.map((r: Repo) => r.nodeId)
      let existingRepoIds = (newState.data[p.key] && newState.data[p.key].repoIds) || []
      newState.data[p.key].repoIds = union(existingRepoIds, repoIds)
      newState.isLoading = false
      return newState

    default:
      return state
  }

  return newState
}
