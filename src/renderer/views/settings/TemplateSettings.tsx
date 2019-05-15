import * as React from 'react'
import { connect } from 'react-redux'
import { logout } from '@/controllers/authController'
import { resetApp } from '@/models/app'
import Editor from '@/views/ui/form/Editor';

interface Props {
  resetApp: () => void
  logout: () => void
}

interface State {
  body: string
}

class TemplateSettings extends React.Component<Props, State> {

  state = {
    body: ''
  }

  _fieldHandler = (e: any) => {
    let newData: State = { ...this.state }

    if (e._cache) {
      newData['body'] = e.toString('markdown')
    }

    this.setState(newData)
  }

  render() {
    return (
      <Editor handler={this._fieldHandler} />
    )
  }
}

const mapDispatch = ({
  resetApp,
  logout
})

export default connect(null, mapDispatch)(TemplateSettings)
