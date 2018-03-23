import { github } from 'controllers/githubController'
import { TRAX_IDENT, SWIMLANES } from 'config/constants'

// Constant Names
const TRACK = 'TRACK'
const UNTRACK = 'UNTRACK'
const UNTRACK_ALL = 'UNTRACK_ALL'

const filterTrax = projects => projects.filter(p => p.name === TRAX_IDENT)

const filterIssuesWithoutLanes = issues => {
  let filterCriteria = [
    SWIMLANES.backlog.name,
    SWIMLANES.started.name,
    SWIMLANES.review.name,
    SWIMLANES.complete.name,
  ]

  return issues.filter(
    i => i.labels.filter(l => filterCriteria.includes(l.name)).length === 0
  )
}

const setupColumns = project_id => dispatch => {
  const query = { project_id }
  const { backlog, started, review, complete } = SWIMLANES
  const columns = [backlog, started, review, complete]

  const _ = c => {
    return {
      body: { name: c.label },
    }
  }

  return Promise.all(
    columns.map(c => dispatch(github.createColumn(query, _(c))))
  )
}

/**
  Setup Labels for Repo
  @see {@link https://developer.github.com/v3/issues/labels/#create-a-label}
  @param {string} owner
  @param {string} repo
**/
const setupLabels = (owner, repo) => dispatch => {
  const query = { owner, repo }
  const { backlog, started, review, complete } = SWIMLANES
  const labels = [backlog, started, review, complete]

  const _ = c => {
    return {
      body: { name: c.name, color: c.color.replace('#', '') },
    }
  }

  // mapping catch ignores rejections and continue the chain
  return Promise.all(
    labels.map(l => dispatch(github.createLabel(query, _(l))).catch(e => e))
  )
}

/**
  Create Backlog of Issues
  @description Loops through all issues and assigns label:backlog to untracked issues
**/
const createBacklog = (owner, repo) => dispatch => {
  return dispatch(github.listIssues({ owner, repo }))
    .then(issues => filterIssuesWithoutLanes(issues))
    .then(issues =>
      issues.map(issue => {
        const { labels, number } = issue
        labels.push(SWIMLANES.backlog.name)
        return dispatch(
          github.updateIssue({ owner, repo, number }, { body: { labels } })
        )
      })
    )
}

// Action Creators
export const track = repository => dispatch => {
  const body = {
    name: 'Trax',
    body: 'An auto-generated project created and managed by the Trax App',
  }

  const owner = repository.owner.login
  const repo = repository.name

  var track = {
    ident: `${owner}/${repo}`,
    repository,
  }

  return dispatch(untrack(repository))
    .then(() => dispatch(github.createProject({ owner, repo }, { body })))
    .then(project => ({ ...track, project }))
    .then(track =>
      dispatch(setupColumns(track.project.id)).then(columns => ({
        ...track,
        columns,
      }))
    )
    .then(track =>
      dispatch(setupLabels(owner, repo)).then(labels => ({ ...track, labels }))
    )
    .then(track =>
      dispatch(createBacklog(owner, repo)).then(issues => ({
        ...track,
        backlog: issues,
      }))
    )
    .then(track => dispatch({ type: TRACK, track }))
}

export const untrack = repository => dispatch => {
  const owner = repository.owner.login
  const repo = repository.name

  var track = {
    ident: `${owner}/${repo}`,
    repository,
  }

  return dispatch(github.listProjects({ owner, repo }))
    .then(projects =>
      filterTrax(projects).map(p =>
        dispatch(github.deleteProject({ id: p.id }))
      )
    )
    .then(() => dispatch({ type: UNTRACK, track }))
}

// @TODO: Have this loop through all projects and wipe anything with name=Trax
export const untrackAll = () => ({ type: UNTRACK_ALL })

// Reducer / Store
const initialState = {
  data: [],
}

export const trackReducer = (state = initialState, action) => {
  switch (action.type) {
    case TRACK:
      return {
        ...state,
        data: state.data.concat([action.track]),
      }

    case UNTRACK:
      return {
        ...state,
        data: state.data.filter(p => p.ident !== action.track.ident),
      }

    case UNTRACK_ALL:
      return {
        ...state,
        data: [],
      }

    default:
      return state
  }
}
