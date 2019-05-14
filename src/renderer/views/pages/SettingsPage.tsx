import * as React from 'react'

import Tabbed from '@/views/ui/Tabbed'
import BoardSettings from '@/views/settings/BoardSettings'
import AppSettings from '@/views/settings/AppSettings'

const SettingsPage: React.SFC<{}> = () => {

  let content = {
    'Board Settings': <BoardSettings />,
    'Application': <AppSettings />
  }

  return (
    <section className="settings page">
      <Tabbed content={content} />
    </section>
  )
}


export default SettingsPage
