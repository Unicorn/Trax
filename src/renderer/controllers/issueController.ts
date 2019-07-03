import { union, merge } from 'lodash'
import { initialState } from '@/models/app'
import { normalizeIssue, ISSUES, ISSUE, Issues, Issue, CreateIssueAction, CreateIssuePayload, IssueAction } from '@/models/issue'
import * as GithubModel from '@/models/github'
import { createResource, updateResource } from 'horseshoes'

export const createIssueRequest = (payload: CreateIssuePayload): CreateIssueAction => ({
  type: ISSUE.CREATE_REQUEST,
  payload
})

export const createIssue = (payload: Issue): IssueAction => ({
  type: ISSUE.CREATE,
  payload: normalizeIssue(payload)
})

export const updateIssues = (payload: Issue[]): IssueAction => ({
  type: ISSUES.UPDATE,
  payload: payload.map(normalizeIssue)
})

export const updateIssue = (payload: Issue): IssueAction => ({
  type: ISSUE.UPDATE,
  payload
})

export const issuesReducer = (state: Issues, action: IssueAction): Issues => {
  if (state === undefined) return initialState.issues

  const { type, payload } = action

  if (!type) return state

  const newState = { ...state }

  switch (type) {
    case GithubModel.GITHUB.ISSUES.REQUEST:
      newState.isLoading = true
      break

    case GithubModel.GITHUB.ISSUES.SUCCESS:
      newState.isLoading = false
      break

    case ISSUE.CREATE:
      return createResource<Issue>(state, payload as Issue)

    case ISSUES.UPDATE:
      ;(payload as Issue[]).forEach(r => {
        newState.keys = union(newState.keys, [r.key])
        newState.data[r.key] = merge(newState.data[r.key], r)
      })
      break

    case ISSUE.UPDATE:
      return updateResource<Issue>(state, payload as Issue)

    default:
      return state
  }

  return newState
}
