import { ISSUE, Issues, IssuesAction, defaultState } from 'models/issue'

export const requestIssues = (ident: string): IssuesAction => ({
  type: ISSUE.REQUEST,
  ident
})

export const receiveIssues = (payload: Issues): IssuesAction => ({
  type: ISSUE.SUCCESS,
  payload
})

export const issuesReducer = (state: Issues = defaultState, action: IssuesAction): Issues => {
  const { payload, type } = action

  switch (type)
  {
    case ISSUE.SUCCESS :
      return payload || state

    default :
      return state
  }
}
