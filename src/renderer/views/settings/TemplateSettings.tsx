/** @jsx createElement **/
import { createElement, FC, useState } from 'react'
import { connect } from 'react-redux'
import { logout } from '@/controllers/authController'
import { setTemplate } from '@/controllers/settingController'
import { resetApp, RootState } from '@/models/app'
import { Settings } from '@/models/setting'
import { ScrumTypes } from '@/config/constants'
import Editor from '@/views/ui/form/Editor'

interface Connected {
  settings: Settings
}

interface Actions {
  _setTemplate: typeof setTemplate
  _resetApp: typeof resetApp
  _logout: typeof logout
}

const TemplateSettings: FC<Connected & Actions> = ({ settings, _setTemplate }) => {
  let [body, setBody] = useState<string>('')
  let [template, setTemplate] = useState<ScrumTypes>('story')

  const _templateHandler = (t: ScrumTypes): void => {
    let markdown = settings.templates[t as ScrumTypes]
    setTemplate(t)
    setBody(markdown)
  }

  const _bodyHandler = (markdown: string): void => {
    setBody(markdown)
    _setTemplate(template, markdown)
  }

  return (
    <Editor
      markdown={body}
      template={template}
      markdownHandler={e => _bodyHandler(e.currentTarget.value)}
      templateHandler={e => _templateHandler(e.currentTarget.value as ScrumTypes)}
    />
  )
}

const mapState = (state: RootState): Connected => ({
  settings: state.settings
})

const mapDispatch: Actions = {
  _setTemplate: setTemplate,
  _resetApp: resetApp,
  _logout: logout
}

export default connect(
  mapState,
  mapDispatch
)(TemplateSettings)
