import { Dispatch } from 'redux'
import { github } from './githubController'
import {
  ADD_ISSUE,
  ADD_ISSUES,
  UPDATE_ISSUE,
  Issue,
  Issues,
  CreateIssue,
  IssueActions,
} from 'types/issue'

export const addIssues = (issues: Issue[]) => ({
  type: ADD_ISSUES,
  issues
})

export const updateIssue = (issue: Issue) => ({
  type: UPDATE_ISSUE,
  issue
})

// Reducer / Store
export const createIssue = ({ owner, repo, body }: CreateIssue) => (dispatch: Dispatch<IssueActions>) => {
  dispatch(github.createIssue({ owner, repo }, { body }))
    .then((issue: Issue) => {
      issue.owner = owner
      issue.repo = repo
      return dispatch({ type: ADD_ISSUE, issue })
    })
    .catch((error: Error) => console.log('error in creating issue', error))
}

export const issueReducer = (state: Issues = {}, action: IssueActions) => {
  let newState = { ...state }

  switch (action.type) {
    case ADD_ISSUE:
      newState[action.issue.id] = action.issue
      return newState

    case ADD_ISSUES:
      action.issues.forEach(issue => (newState[issue.id] = issue))
      return newState

    case UPDATE_ISSUE:
      newState[action.issue.id] = action.issue
      return newState

    default:
      return state
  }
}
