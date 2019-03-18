import { union, merge } from 'lodash'
import { action } from 'helpers/reduxHelper'
import {
  ISSUE,
  Issues,
  Issue,
  CreateIssueRequest,
  IssuesAction,
  defaultIssueState
} from 'models/issue'
import { Lane } from 'config/constants'

export const issuesList = {
  request: (ident: string) => action(ISSUE.LIST.REQUEST, { ident }),
  success: (payload: Issues) => action(ISSUE.LIST.SUCCESS, { payload }),
  failure: (payload: any) => action(ISSUE.LIST.FAILURE, { payload })
}

export const issueCreate = {
  request: (ident: string, payload: CreateIssueRequest) => action(ISSUE.CREATE.REQUEST, { ident, payload }),
  success: (payload: Issue) => action(ISSUE.CREATE.SUCCESS, { payload }),
  failure: (payload: any) => action(ISSUE.CREATE.FAILURE, { payload })
}

export const receiveIssues = (payload: Issues): IssuesAction => ({
  type: ISSUE.LIST.SUCCESS,
  payload
})

export const receiveIssue = (payload: Issues): IssuesAction => ({
  type: ISSUE.UPDATE.SUCCESS,
  payload
})

export const switchLanes = (payload: Issue, from: string, to: string): IssuesAction => ({
  type: ISSUE.UPDATE.REQUEST,
  payload,
  from,
  to
})

export const issuesReducer = (state: Issues = defaultIssueState, action: IssuesAction): Issues => {
  const { payload, type } = action
  const newState = { ...state }
  var issue

  switch (type)
  {
    case ISSUE.LIST.SUCCESS :
      let issues = payload as Issues
      newState.entities.issues = merge(newState.entities.issues, issues.entities.issues)
      newState.result = union(newState.result, issues.result)
      return newState

    case ISSUE.UPDATE.REQUEST :
      issue = payload as Issue
      newState.entities.issues[issue.id] = {
        ...issue,
        lane: action.to as Lane
      }
      return newState

    case ISSUE.UPDATE.SUCCESS :
      issue = payload as Issues
      if (issue.result)
        newState.entities.issues[issue.result as string] = {
          ...newState.entities.issues[issue.result as string],
          ...issue.entities.issues[issue.result as string]
        }
      return newState

    default :
      return state
  }
}
