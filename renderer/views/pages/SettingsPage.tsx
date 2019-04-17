import * as React from 'react'

import Tabbed from 'views/ui/Tabbed'
import LaneSettings from 'views/settings/LaneSettings'
import AppSettings from 'views/settings/AppSettings'

const SettingsPage: React.SFC<{}> = () => {

  let content = {
    'Board Settings': <LaneSettings />,
    'Application': <AppSettings />
  }

  return (
    <section className="settings page">
      <Tabbed content={content} />
    </section>
  )
}


export default SettingsPage
