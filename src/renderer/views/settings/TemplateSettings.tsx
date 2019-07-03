/** @jsx createElement **/
import { createElement, Component, ReactNode } from 'react'
import { connect } from 'react-redux'
import { EditorValue } from 'react-rte'
import { logout } from '@/controllers/authController'
import { resetApp } from '@/models/app'
import Editor from '@/views/ui/form/Editor'

interface Connected {
  _resetApp: typeof resetApp
  _logout: typeof logout
}

interface State {
  body: string
}

class TemplateSettings extends Component<Connected, State> {
  state = {
    body: ''
  }

  _fieldHandler = (e: EditorValue) => {
    let newData: State = { ...this.state }

    if (e.getEditorState) {
      newData['body'] = e.toString('markdown')
    }

    this.setState(newData)
  }

  render(): ReactNode {
    return <Editor handler={this._fieldHandler} />
  }
}

const mapDispatch: Connected = {
  _resetApp: resetApp,
  _logout: logout
}

export default connect(
  null,
  mapDispatch
)(TemplateSettings)
