import * as React from 'react'
import Tabbed from 'views/ui/Tabbed'
import LaneSettings from 'views/settings/LaneSettings'

const Settings: React.SFC<{}> = () => {

  let content = {
    'Board Settings': <LaneSettings />,
    'test': null
  }

  return (
    <section className="settings page">
      <Tabbed content={content} />
    </section>
  )
}


export default Settings
