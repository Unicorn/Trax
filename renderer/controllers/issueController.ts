import { ISSUE, Issues, Issue, IssuesAction, defaultState } from 'models/issue'

export const requestIssues = (ident: string): IssuesAction => ({
  type: ISSUE.REQUEST,
  ident
})

export const receiveIssues = (payload: Issues): IssuesAction => ({
  type: ISSUE.SUCCESS,
  payload
})

export const receiveIssue = (payload: Issue): IssuesAction => ({
  type: ISSUE.UPDATE_SUCCESS,
  payload
})

export const switchLanes = (payload: Issue, from: string, to: string): IssuesAction => ({
  type: ISSUE.UPDATE_REQUEST,
  payload,
  from,
  to
})

export const issuesReducer = (state: Issues = defaultState, action: IssuesAction): Issues => {
  const { payload, type } = action
  const newState = { ...state }

  switch (type)
  {
    case ISSUE.SUCCESS :
      return (payload as Issues) || state

    case ISSUE.UPDATE_REQUEST :
      console.log("REQUEST", payload, action.from, action.to)

    case ISSUE.UPDATE_SUCCESS :
      console.log("UPDATE_SUCCESS", payload)
      let issue = payload as Issue
      newState.entities.issues[issue.id] = issue
      return newState

    default :
      return state
  }
}
