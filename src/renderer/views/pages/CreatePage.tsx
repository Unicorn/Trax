/** @jsx createElement **/
import { createElement, FormEvent, SFC, useState } from 'react'
import { connect } from 'react-redux'
import { UI, toOptions } from 'horseshoes'
import { createIssueRequest } from '@/controllers/issueController'
import { Tracks, Track } from '@/models/track'
import { Users } from '@/models/user'
import { RootState } from '@/models/app'
import { Settings } from '@/models/setting'
import { defaultLanes } from '@/models/lane'
import { TYPES, PRIORITY, POINTS, ScrumTypes } from '@/config/constants'
import { labelNames } from '@/helpers/issueHelper'
import Editor from '@/views/ui/Editor'
import { OptionsObject } from 'horseshoes/build/main/lib/views/form/types'

interface Connected {
  tracks: Tracks
  users: Users
  settings: Settings
}

interface Actions {
  _createIssueRequest: typeof createIssueRequest
}

interface State {
  [key: string]: string
}

const defaultState: State = {
  title: '',
  type: '',
  lane: 'backlog',
  points: '',
  priority: '',
  assignee: '',
  ident: '',
  markdown: '',
  template: 'story'
}

const CreatePage: SFC<Connected & Actions> = ({ tracks, users, settings, _createIssueRequest }) => {
  const [state, setState] = useState<State>(defaultState)
  const [userOptions, setUserOptions] = useState<OptionsObject>({})

  const _submitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    const [owner, repo] = state.ident.split('/')

    const payload = {
      title: state.title,
      body: state.markdown,
      owner,
      repo,
      labels: labelNames([state.type, state.points, state.priority, state.lane]),
      assignees: [state.assignee]
    }

    _createIssueRequest(payload)
    setState(defaultState)
  }

  const _fieldHandler = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const nextState: State = { ...state }
    const input = e.currentTarget
    nextState[input.name] = input.value
    setState(nextState)
  }

  const _templateHandler = (e: FormEvent<HTMLSelectElement>): void => {
    const template = e.currentTarget.value
    const nextState: State = { ...state, template, markdown: settings.templates[template] }
    setState(nextState)
  }

  const _repoSelectHandler = (e: FormEvent<HTMLSelectElement>): void => {
    const ident = e.currentTarget.value
    const nextState = { ...state, ident }
    const userOpts: OptionsObject = {}

    if (tracks.data[ident]) {
      tracks.data[ident].userIds.forEach(id => {
        const user = users.data[id]
        if (user) userOpts[user.login] = { label: user.login }
      })
    }

    setState(nextState)
    setUserOptions(userOpts)
  }

  return (
    <section className="create page">
      <form className="golden-ratio columns" onSubmit={_submitHandler}>
        <div className="left column">
          <h1>Create Issue</h1>

          <UI.form.SelectField
            name="ident"
            type="select"
            label="Repo"
            options={toOptions<Track>(tracks, 'ident')}
            onChange={_repoSelectHandler}
            selected={state.ident}
            value={state.ident}
            required
          />

          <UI.form.SelectField
            name="assignee"
            type="select"
            label="Assigned to"
            options={userOptions}
            onChange={_fieldHandler}
            selected={state.assignee}
            value={state.assignee}
          />

          <UI.form.TextField name="title" type="text" label="Title" onChange={_fieldHandler} value={state.title} required />

          {settings.featurePoints && (
            <UI.form.RadioField
              name="points"
              type="group"
              label="Points"
              options={POINTS}
              onChange={_fieldHandler}
              selected={state.points}
              value={state.points}
            />
          )}

          {settings.featurePriority && (
            <UI.form.RadioField
              name="priority"
              type="group"
              label="Priority"
              options={PRIORITY}
              onChange={_fieldHandler}
              selected={state.priority}
              value={state.priority}
            />
          )}

          {settings.featureTypes && (
            <UI.form.RadioField
              name="type"
              type="group"
              label="Type"
              options={TYPES}
              onChange={_fieldHandler}
              selected={state.type}
              value={state.type}
            />
          )}

          <UI.form.RadioField
            name="lane"
            type="group"
            label="Swimlane"
            options={defaultLanes}
            onChange={_fieldHandler}
            selected={state.lane}
            value={state.lane}
          />

          <button className="large teal button">Submit</button>
        </div>

        <div className="right column">
          <Editor
            template={state.template as ScrumTypes}
            markdown={state.markdown}
            markdownHandler={_fieldHandler}
            templateHandler={_templateHandler}
          />
        </div>
      </form>
    </section>
  )
}

const mapState = (state: RootState): Connected => ({
  tracks: state.tracks,
  users: state.users,
  settings: state.settings
})

const mapDispatch: Actions = {
  _createIssueRequest: createIssueRequest
}

export default connect(
  mapState,
  mapDispatch
)(CreatePage)
