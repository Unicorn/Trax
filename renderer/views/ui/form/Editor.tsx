import * as React from 'react'
import RichTextEditor, { EditorValue } from 'react-rte'
import { FormField } from 'views/ui/form/FormField'

type ModeOption = 'editor' | 'markdown'

interface Props {
  handler: (e: EditorValue) => void
}

interface State {
  mode: ModeOption
  body: EditorValue
}

const modeOptions = {
  editor: {
    label: 'Editor'
  },
  markdown: {
    label: 'Markdown'
  }
}

export class Editor extends React.Component<Props, State> {

  state: State = {
    mode: 'editor',
    body: RichTextEditor.createEmptyValue()
  }

  _modeHandler = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ mode: e.currentTarget.value as ModeOption })
  }

  _editorHandler = (e: EditorValue): void => {
    this.setState({ body: e })
    this.props.handler(e)
  }

  _textareaHandler = (e: React.FormEvent<HTMLTextAreaElement>): void => {
    let newState = RichTextEditor.createValueFromString(e.currentTarget.value, this.state.mode)
    this.setState({ body: newState })
    this.props.handler(newState)
  }

  _renderEditor = () => {
    const { body, mode } = this.state

    switch(mode) {
      case 'editor' :
        return <RichTextEditor
          className="rich-text"
          editorClassName="rich-text-editor"
          toolbarClassName="rich-text-toolbar"
          onChange={this._editorHandler}
          value={body}
        />
      case 'markdown' :
        return <textarea onChange={this._textareaHandler}>{body.toString(mode)}</textarea>
    }
  }

  render() {
    return (
      <div className="editor">
        <FormField
          name="editor"
          type="tabs"
          label="Editor"
          options={modeOptions}
          onChange={this._modeHandler}
          selected={this.state.mode}
        />

        {this._renderEditor()}
      </div>
    )
  }
}
