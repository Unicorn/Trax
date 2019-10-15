/** @jsx createElement **/
import { createElement, Component, FormEvent, ReactNode } from 'react'
import { connect } from 'react-redux'
import { createIssueRequest } from '@/controllers/issueController'
import { Tracks } from '@/models/track'
import { Users } from '@/models/user'
import { RootState } from '@/models/app'
import { Settings } from '@/models/setting'
import { defaultLanes } from '@/models/lane'
import { TYPES, PRIORITY, POINTS, ScrumTypes } from '@/config/constants'
import { labelNames } from '@/helpers/issueHelper'
import Form, { OptionsObject } from '@/views/ui/form'
import Editor from '@/views/ui/form/Editor'

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

const defaultState = {
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

class CreatePage extends Component<Connected & Actions, State> {
  state = defaultState
  repoOptions: OptionsObject = {}
  userOptions: OptionsObject = {}

  _submitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    const { title, type, lane, points, priority, assignee, ident, markdown } = this.state
    const [owner, repo] = ident.split('/')

    const payload = {
      title,
      body: markdown,
      owner,
      repo,
      labels: labelNames([type, points, priority, lane]),
      assignees: [assignee]
    }

    this.props._createIssueRequest(payload)
    this.setState(defaultState)
  }

  _fieldHandler = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const newData: State = { ...this.state }
    const input = e.currentTarget
    newData[input.name] = input.value

    this.setState(newData)
  }

  _templateHandler = (e: FormEvent<HTMLSelectElement>): void => {
    const template = e.currentTarget.value
    this.setState({ template, markdown: this.props.settings.templates[template] })
  }

  _repoSelectHandler = (e: React.FormEvent<HTMLSelectElement>): void => {
    const { tracks, users } = this.props
    const ident = e.currentTarget.value
    this.setState({ ident })

    if (tracks.data[ident]) {
      tracks.data[ident].userIds.forEach(id => {
        const user = users.data[id]
        if (user) this.userOptions[user.login] = { label: user.login }
      })
    }
  }

  render(): ReactNode {
    const { tracks, settings } = this.props
    const { template, ident, title, markdown, type, priority, points, lane, assignee } = this.state

    tracks.keys.forEach(key => {
      this.repoOptions[tracks.data[key].ident] = {
        label: tracks.data[key].ident
      }
    })

    return (
      <section className="create page">
        <form className="golden-ratio columns" onSubmit={this._submitHandler}>
          <div className="left column">
            <h1>Create Issue</h1>

            <Form.SelectField
              name="ident"
              type="select"
              label="Repo"
              options={this.repoOptions}
              onChange={this._repoSelectHandler}
              selected={ident}
              value={ident}
              required
            />

            <Form.SelectField
              name="assignee"
              type="select"
              label="Assigned to"
              options={this.userOptions}
              onChange={this._fieldHandler}
              selected={assignee}
              value={assignee}
            />

            <Form.TextField name="title" type="text" label="Title" onChange={this._fieldHandler} value={title} required />

            {settings.featurePoints && (
              <Form.RadioField
                name="points"
                type="group"
                label="Points"
                options={POINTS}
                onChange={this._fieldHandler}
                selected={points}
                value={points}
              />
            )}

            {settings.featurePriority && (
              <Form.RadioField
                name="priority"
                type="group"
                label="Priority"
                options={PRIORITY}
                onChange={this._fieldHandler}
                selected={priority}
                value={priority}
              />
            )}

            {settings.featureTypes && (
              <Form.RadioField
                name="type"
                type="group"
                label="Type"
                options={TYPES}
                onChange={this._fieldHandler}
                selected={type}
                value={type}
              />
            )}

            <Form.RadioField
              name="lane"
              type="group"
              label="Swimlane"
              options={defaultLanes}
              onChange={this._fieldHandler}
              selected={lane}
              value={lane}
            />

            <button className="large teal button">Submit</button>
          </div>

          <div className="right column">
            <Editor
              template={template as ScrumTypes}
              markdown={markdown}
              markdownHandler={this._fieldHandler}
              templateHandler={this._templateHandler}
            />
          </div>
        </form>
      </section>
    )
  }
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
