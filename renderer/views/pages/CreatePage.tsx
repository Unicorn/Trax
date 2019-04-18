import * as React from 'react'
import { connect } from 'react-redux'

import { AppState } from 'models/app'
import { labelNames } from 'helpers/issueHelper'
import { createIssueRequest } from 'controllers/issueController'
import { Tracks } from 'models/track'
import { Users } from 'models/user'
import { TYPES, SWIMLANES, PRIORITY, POINTS } from 'config/constants'

import { Editor } from 'views/ui/form/Editor'
import { FormField, OptionsObject } from 'views/ui/form/FormField'

interface Connected {
  tracks: Tracks
  users: Users
  dispatch: (action: any) => any
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

class CreatePage extends React.Component<Connected, State> {

  state = defaultState
  repoOptions: OptionsObject = {}
  userOptions: OptionsObject = {}

  _submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { title, type, lane, points, priority, assignee, ident, body } = this.state
    const [owner, repo] = ident.split('/')

    let payload = {
      title,
      body,
      owner,
      repo,
      labels: labelNames([type, points, priority, lane]),
      assignees: [assignee],
    }

    this.props.dispatch(createIssueRequest(payload))
    this.setState(defaultState)
  }

  _fieldHandler = (e: any) => {
    let newData: State = { ...this.state }

    if (e._cache) {
      newData['body'] = e.toString('markdown')
    }
    else {
      let input = (e as React.FormEvent<HTMLInputElement>).currentTarget
      newData[input.name] = input.value
    }

    this.setState(newData)
  }

  _repoSelectHandler = (e: React.FormEvent<HTMLSelectElement>) => {
    const { tracks, users } = this.props
    let ident = e.currentTarget.value
    this.setState({ ident })

    if (tracks.data[ident]) {
      tracks.data[ident].userIds.forEach(id => {
        let user = users.data[id]
        if (user)
          this.userOptions[user.login] = { label: user.login }
      })
    }
  }

  render() {
    const { tracks } = this.props
    const { type, priority, points, lane, assignee } = this.state

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

            <FormField
              name="ident"
              type="select"
              label="Repo"
              options={this.repoOptions}
              onChange={this._repoSelectHandler}
              required
            />

            <FormField
              name="assignee"
              type="select"
              label="Assigned to"
              options={this.userOptions}
              selected={assignee}
              onChange={this._fieldHandler}
            />

            <FormField
              name="title"
              type="text"
              label="Title"
              onChange={this._fieldHandler}
              required
            />

            <FormField
              name="points"
              type="group"
              label="Points"
              options={POINTS}
              selected={points}
              onChange={this._fieldHandler}
            />

            <FormField
              name="priority"
              type="group"
              label="Priority"
              options={PRIORITY}
              selected={priority}
              onChange={this._fieldHandler}
            />

            <FormField
              name="type"
              type="group"
              label="Type"
              options={TYPES}
              selected={type}
              onChange={this._fieldHandler}
            />

            <FormField
              name="lane"
              type="group"
              label="Swimlane"
              options={SWIMLANES}
              selected={lane}
              onChange={this._fieldHandler}
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

const mapState = (state: AppState) => ({
  tracks: state.tracks,
  users: state.users
})

export default connect(mapState)(CreatePage)
