import * as React from 'react'
import { connect } from 'react-redux'
import RichTextEditor, { EditorValue } from 'react-rte'
import FormField from 'views/ui/form/FormField'
import { createIssue } from 'controllers/issueController'
import { TYPES, SWIMLANES } from 'config/constants'

interface Connected {
  dispatch: (action: any) => any
}

interface State {
  [key: string]: string | EditorValue
}

type FieldHandler = (e: React.FormEvent<HTMLInputElement> | EditorValue) => void

class Create extends React.Component<Connected, State> {
  state = {
    title: '',
    type: '',
    lane: '',
    repo: '',
    description: RichTextEditor.createEmptyValue()
  }

  _submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // print the form values to the console
    console.log('submit', e.currentTarget)

    this.props.dispatch(createIssue.request(this.state))
  }

  _fieldHandler: FieldHandler = (e) => {
    let newData: State = { ...this.state }

    if (e instanceof EditorValue) {
      newData['description'] = e
    }
    else {
      let input = (e as React.FormEvent<HTMLInputElement>).currentTarget
      newData[input.name] = input.value
    }

    this.setState(newData)
  }

  render() {
    const { description } = this.state

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
                options={{
                  'UnicornAgency/Trax': {
                    label: 'UnicornAgency/Trax'
                  }
                }}
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
                value={description as EditorValue}
              />
            </div>
          </form>
        </header>
      </section>
    )
  }
}

export default connect()(Create)
