/** @jsx createElement **/
import { createElement, Component, ReactNode } from 'react'
import RichTextEditor, { EditorValue } from 'react-rte'
import RadioField from './RadioField'
import SelectField from './SelectField'
import { TYPES } from '@/config/constants'

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

class Editor extends Component<Props, State> {
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

  _templateSelectHandler = (e: React.FormEvent<HTMLSelectElement>): void => {
    console.log('_templateSelectHandler', e.currentTarget.value)
  }

  _renderEditor = (): ReactNode => {
    const { body, mode } = this.state

    switch (mode) {
      case 'editor':
        return (
          <RichTextEditor
            className="rich-text"
            editorClassName="rich-text-editor"
            toolbarClassName="rich-text-toolbar"
            onChange={this._editorHandler}
            value={body}
          />
        )
      case 'markdown':
        return <textarea onChange={this._textareaHandler} value={body.toString(mode)}></textarea>
    }
  }

  render(): ReactNode {
    return (
      <div className="editor">
        <RadioField
          name="editor"
          type="tabs"
          label="Editor"
          options={modeOptions}
          onChange={this._modeHandler}
          selected={this.state.mode}
        />

        <SelectField name="template" type="select" label="Template" options={TYPES} onChange={this._templateSelectHandler} required />

        {this._renderEditor()}
      </div>
    )
  }
}

export default Editor
