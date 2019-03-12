import * as React from 'react'
import { connect } from 'react-redux'
import RichTextEditor, { EditorValue } from 'react-rte'
import { FormField, SelectOptionObject } from 'views/ui/form/FormField'
import { issueCreate } from 'controllers/issueController'
import { labelNames } from 'helpers/issueHelper'
import { Tracks } from 'models/track'
import { TYPES, SWIMLANES, PRIORITY } from 'config/constants'

interface Connected {
  tracks: Tracks
  dispatch: (action: any) => any
}

interface State {
  [key: string]: string | EditorValue
}

type FieldHandler = (e: React.FormEvent<HTMLInputElement> | EditorValue) => void

const defaultState = {
  title: '',
  type: '',
  lane: '',
  priority: '',
  assignee: '',
  repo: '',
  body: RichTextEditor.createEmptyValue()
}

class Create extends React.Component<Connected, State> {
  state = defaultState

  _submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { title, type, lane, priority, assignee, repo, body } = this.state
    const { dispatch } = this.props

    let payload = {
      title,
      body: body.toString('html'),
      labels: labelNames([type, priority, lane]),
      assignees: [assignee],
    }

    dispatch(issueCreate.request(repo, payload))
  }

  _fieldHandler: FieldHandler = (e) => {
    let newData: State = { ...this.state }

    if (e instanceof EditorValue) {
      newData['body'] = e
    }
    else {
      let input = (e as React.FormEvent<HTMLInputElement>).currentTarget
      newData[input.name] = input.value
    }

    this.setState(newData)
  }

  render() {
    const { tracks } = this.props
    const { body } = this.state
    const repoOptions: SelectOptionObject = {}

    tracks.forEach(t => {
      repoOptions[t.ident] = {
        label: t.ident
      }
    })

    return (
      <section className="create page">
        <header>
          <h1>Create Issue</h1>
          <form className="golden-ratio columns" onSubmit={this._submitHandler}>
            <div className="left column">
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
              <RichTextEditor
                className="rich-text"
                editorClassName="rich-text-editor"
                toolbarClassName="rich-text-toolbar"
                editorStyle={{ height: "calc(100vh - 20rem)"  }}
                onChange={this._fieldHandler}
                value={body as EditorValue}
              />
            </div>
          </form>
        </header>
      </section>
    )
  }
}

const mapState = (state: any) => ({
  tracks: state.tracks
})

export default connect(mapState)(Create)
