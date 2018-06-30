import { ISSUE, Issues, IssuesAction } from 'models/issue'

export const requestIssues = (): IssuesAction => ({
  type: ISSUE.REQUEST,
})

export const receiveIssues = (payload: Issues): IssuesAction => ({
  type: ISSUE.SUCCESS,
  payload
})

export const issuesReducer = (state: Issues = [], action: IssuesAction): Issues => {
  const { payload, type } = action

  switch (type)
  {
    case ISSUE.SUCCESS :
      return payload || state

    default :
      return state
  }
}
