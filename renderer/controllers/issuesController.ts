import { github } from './githubController'
import {
  ADD_ISSUE,
  ADD_ISSUES,
  UPDATE_ISSUE,
  Issue,
  Issues,
  CreateIssue,
  IssueActions,
} from 'models/issue'

export const addIssues = (issues: Issue[]) => ({
  type: ADD_ISSUES,
  issues
})

export const updateIssue = (issue: Issue) => ({
  type: UPDATE_ISSUE,
  issue
})

// Reducer / Store
export const createIssue = ({ owner, repo, body }: CreateIssue) => (dispatch: any) => {
  dispatch(github.createIssue({ owner, repo }, { body }))
    .then((issue: Issue) => {
      issue.owner = owner
      issue.repo = repo
      return dispatch({ type: ADD_ISSUE, issue })
    })
    .catch((error: Error) => console.log('error in creating issue', error))
}

export const issuesReducer = (state: Issues = {}, action: IssueActions) => {
  let newState = { ...state }

  switch (action.type) {
    case ADD_ISSUE:
      if (!action.issue) return state
      newState[action.issue.id] = action.issue
      return newState

    case ADD_ISSUES:
      if (!action.issues) return state
      action.issues.forEach(issue => (newState[issue.id] = issue))
      return newState

    case UPDATE_ISSUE:
      if (!action.issue) return state
      newState[action.issue.id] = action.issue
      return newState

    default:
      return state
  }
}
