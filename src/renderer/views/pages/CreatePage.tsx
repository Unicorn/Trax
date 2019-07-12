/** @jsx createElement **/
import { createElement, Component, FormEvent, ReactNode } from 'react'
import { connect } from 'react-redux'
import { EditorValue } from 'react-rte'
import { createIssueRequest } from '@/controllers/issueController'
import { TYPES, SWIMLANES, PRIORITY, POINTS } from '@/config/constants'
import { Tracks } from '@/models/track'
import { Users } from '@/models/user'
import { RootState } from '@/models/app'
import { Settings } from '@/models/setting'
import { CreateIssuePayload, CreateIssueAction } from '@/models/issue'
import { labelNames } from '@/helpers/issueHelper'
import Form, { OptionsObject } from '@/views/ui/form'
import Editor from '@/views/ui/form/Editor'

interface Connected {
  tracks: Tracks
  users: Users
  settings: Settings
}

interface Actions {
  createIssueRequest: (payload: CreateIssuePayload) => CreateIssueAction
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
  body: ''
}

class CreatePage extends Component<Connected & Actions, State> {
  state = defaultState
  repoOptions: OptionsObject = {}
  userOptions: OptionsObject = {}

  _submitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    const { title, type, lane, points, priority, assignee, ident, body } = this.state
    const [owner, repo] = ident.split('/')

    let payload = {
      title,
      body,
      owner,
      repo,
      labels: labelNames([type, points, priority, lane]),
      assignees: [assignee]
    }

    console.log("payload", payload, defaultState)

    // this.props.createIssueRequest(payload)
    this.setState(defaultState)
  }

  _fieldHandler = (e: FormEvent<HTMLElement> | EditorValue): void => {
    let newData: State = { ...this.state }

    if ((e as EditorValue).getEditorState) {
      newData['body'] = e.toString('markdown')
    } else {
      let input = (e as React.FormEvent<HTMLInputElement>).currentTarget
      newData[input.name] = input.value
    }

    this.setState(newData)
  }

  _repoSelectHandler = (e: React.FormEvent<HTMLSelectElement>): void => {
    const { tracks, users } = this.props
    let ident = e.currentTarget.value
    this.setState({ ident })

    if (tracks.data[ident]) {
      tracks.data[ident].userIds.forEach(id => {
        let user = users.data[id]
        if (user) this.userOptions[user.login] = { label: user.login }
      })
    }
  }

  render(): ReactNode {
    const { tracks, settings } = this.props
    const { ident, title, type, priority, points, lane, assignee } = this.state

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

            <Form.TextField
              name="title"
              type="text"
              label="Title"
              onChange={this._fieldHandler}
              value={title}
              required
            />

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
              options={SWIMLANES}
              onChange={this._fieldHandler}
              selected={lane}
              value={lane}
            />

            <button className="large teal button">Submit</button>
          </div>

          <div className="right column">
            <Editor handler={this._fieldHandler} />
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

const mapDispatch = {
  createIssueRequest
}

export default connect(
  mapState,
  mapDispatch
)(CreatePage)
