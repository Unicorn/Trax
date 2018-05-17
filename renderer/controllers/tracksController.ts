import { github } from 'controllers/githubController'
import { TRAX_IDENT, SWIMLANES, Swimlane } from 'config/constants'
import { Issue, EditIssue } from 'models/issue'
import {
  CREATE_TRACK,
  DELETE_TRACK,
  CLEAR_TRACKS,
  Tracks,
  TrackActions
} from 'models/track'


const filterTrax = (projects: any[]) => projects.filter(p => p.name === TRAX_IDENT)

const filterIssuesWithoutLanes = (issues: Issue[]) => {
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

const setupColumns = (project_id: string) => (dispatch: any) => {
  const query = { project_id }
  const { backlog, started, review, complete } = SWIMLANES
  const columns = [backlog, started, review, complete]

  const _ = (c: Swimlane) => {
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
const setupLabels = (owner: string, repo: string) => (dispatch: any) => {
  const query = { owner, repo }
  const { backlog, started, review, complete } = SWIMLANES
  const labels = [backlog, started, review, complete]

  const _ = (c: Swimlane) => {
    return {
      body: { name: c.name, color: c.color.replace('#', '') },
    }
  }

  // mapping catch ignores rejections and continue the chain
  return Promise.all(
    labels.map(l => dispatch(github.createLabel(query, _(l))).catch((e: Error) => e))
  )
}

/**
  Create Backlog of Issues
  @description Loops through all issues and assigns label:backlog to untracked issues
**/
const createBacklog = (owner: string, repo: string) => (dispatch: any) => {
  return dispatch(github.listIssues({ owner, repo }))
    .then((issues: Issue[]) => filterIssuesWithoutLanes(issues))
    .then((issues: EditIssue[]) =>
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
export const createTrack = (repository: any) => (dispatch: any) => {
  console.log('repo', repository)

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

  return dispatch(deleteTrack(repository))
    .then(() => dispatch(github.createProject({ owner, repo }, { body })))
    .then((project: any) => ({ ...track, project }))
    .then((track: any) =>
      dispatch(setupColumns(track.project.id)).then((columns: any) => ({
        ...track,
        columns,
      }))
    )
    .then((track: any) =>
      dispatch(setupLabels(owner, repo)).then((labels: any) => ({ ...track, labels }))
    )
    .then((track: any) =>
      dispatch(createBacklog(owner, repo)).then((issues: Issue[]) => ({
        ...track,
        backlog: issues,
      }))
    )
    .then((track: any) => dispatch({ type: CREATE_TRACK, track }))
}

export const deleteTrack = (repository: any) => (dispatch: any) => {
  const owner = repository.owner.login
  const repo = repository.name

  var track = {
    ident: `${owner}/${repo}`,
    repository,
  }

  return dispatch(github.listProjects({ owner, repo }))
    .then((projects: any) =>
      filterTrax(projects).map(p =>
        dispatch(github.deleteProject({ id: p.id }))
      )
    )
    .then(() => dispatch({ type: DELETE_TRACK, track }))
}

// @TODO: Have this loop through all projects and wipe anything with name=Trax
export const clearTracks = () => ({
  type: CLEAR_TRACKS
})

export const tracksReducer = (state: Tracks = {}, action: TrackActions) => {
  let newState = { ...state }

  switch (action.type) {
    case CREATE_TRACK:
      newState[action.track.ident] = action.track
      return newState

    case DELETE_TRACK:
      delete newState[action.track.ident]
      return newState

    case CLEAR_TRACKS:
      return {}

    default:
      return state
  }
}
