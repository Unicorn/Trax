import { github } from './githubController'

// Constant Names
const ADD_ISSUE = 'ADD_ISSUE'
const ADD_ISSUES = 'ADD_ISSUES'
const UPDATE_ISSUE = 'UPDATE_ISSUE'

export const addIssues = issues => ({ type: ADD_ISSUES, issues })

export const updateIssue = issue => ({ type: UPDATE_ISSUE, issue })

// Reducer / Store
const initialState = {}

export const createIssue = ({ owner, repo, body }) => dispatch => {
  dispatch(github.createIssue({ owner, repo }, { body }))
    .then(issue => {
      issue.owner = owner
      issue.repo = repo
      return dispatch({ type: ADD_ISSUE, issue })
    })
    .catch(error => console.log('error in creating issue', error))
}

export const issueReducer = (state = initialState, action) => {
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
