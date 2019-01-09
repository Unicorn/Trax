import { action } from 'helpers/reduxHelper'
import { ISSUE, Issues, Issue, IssuesAction, defaultState } from 'models/issue'

export const issuesList = {
  request: (ident: string) => action(ISSUE.LIST.REQUEST, { ident }),
  success: (payload: Issues) => action(ISSUE.LIST.SUCCESS, { payload }),
  failure: (payload: any) => action(ISSUE.LIST.FAILURE, { payload })
}

export const receiveIssues = (payload: Issues): IssuesAction => ({
  type: ISSUE.LIST.SUCCESS,
  payload
})

export const receiveIssue = (payload: Issue): IssuesAction => ({
  type: ISSUE.UPDATE.SUCCESS,
  payload
})

export const switchLanes = (payload: Issue, from: string, to: string): IssuesAction => ({
  type: ISSUE.UPDATE.REQUEST,
  payload,
  from,
  to
})

export const issuesReducer = (state: Issues = defaultState, action: IssuesAction): Issues => {
  const { payload, type } = action
  const newState = { ...state }

  switch (type)
  {
    case ISSUE.LIST.SUCCESS :
      return (payload as Issues) || state

    case ISSUE.UPDATE.REQUEST :
      console.log("REQUEST", payload, action.from, action.to)

    case ISSUE.UPDATE.SUCCESS :
      console.log("UPDATE_SUCCESS", payload)
      let issue = payload as Issue
      newState.entities.issues[issue.id] = issue
      return newState

    default :
      return state
  }
}
