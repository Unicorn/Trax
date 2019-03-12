import * as React from 'react'
import { connect } from 'react-redux'
import { Editor } from 'views/ui/form/Editor'
import { FormField, OptionsObject } from 'views/ui/form/FormField'
import { issueCreate } from 'controllers/issueController'
import { labelNames } from 'helpers/issueHelper'
import { Tracks } from 'models/track'
import { TYPES, SWIMLANES, PRIORITY } from 'config/constants'

interface Connected {
  tracks: Tracks
  dispatch: (action: any) => any
}

interface State {
  [key: string]: string
}

const defaultState = {
  title: '',
  type: '',
  lane: '',
  priority: '',
  assignee: '',
  repo: '',
  body: ''
}

class Create extends React.Component<Connected, State> {
  state = defaultState

  _submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { title, type, lane, priority, assignee, repo, body } = this.state
    const { dispatch } = this.props

    let payload = {
      title,
      body,
      labels: labelNames([type, priority, lane]),
      assignees: [assignee],
    }

    dispatch(issueCreate.request(repo, payload))
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

    console.log(newData)

    this.setState(newData)
  }

  render() {
    const { tracks } = this.props

    const repoOptions: OptionsObject = {}

    tracks.forEach(t => {
      repoOptions[t.ident] = {
        label: t.ident
      }
    })

    return (
      <section className="create page">
        <form className="golden-ratio columns" onSubmit={this._submitHandler}>
          <div className="left column">
            <h1>Create Issue</h1>

            <FormField
              name="title"
              type="text"
              label="Title"
              onChange={this._fieldHandler}
              required
            />

            <FormField
              name="priority"
              type="select"
              label="Priority"
              options={PRIORITY}
              onChange={this._fieldHandler}
              required
            />

            <FormField
              name="type"
              type="select"
              label="Type"
              options={TYPES}
              onChange={this._fieldHandler}
              required
            />

            <FormField
              name="lane"
              type="select"
              label="Swimlane"
              options={SWIMLANES}
              onChange={this._fieldHandler}
              required
            />

            <FormField
              name="repo"
              type="select"
              label="Repo"
              options={repoOptions}
              onChange={this._fieldHandler}
              required
            />

            <button className="basic button">Submit</button>
          </div>

          <div className="right column">
            <Editor handler={this._fieldHandler} />
          </div>
        </form>
      </section>
    )
  }
}

const mapState = (state: any) => ({
  tracks: state.tracks
})

export default connect(mapState)(Create)
