import { IssuesCreateParams } from '@octokit/rest'
import { createResource, updateResource, updateResources } from 'horseshoes'
import { initialState } from '@/models/app'
import { normalizeIssue, ISSUES, ISSUE, Issues, Issue, CreateIssueAction, IssueAction } from '@/models/issue'
import * as GithubModel from '@/models/github'

export const createIssueRequest = (payload: IssuesCreateParams): CreateIssueAction => ({
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
      return updateResources<Issue>(state, payload as Issue[])

    case ISSUE.UPDATE:
      return updateResource<Issue>(state, payload as Issue)

    default:
      return state
  }

  return newState
}
