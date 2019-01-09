import * as React from 'react'
import SettingsNav from 'views/settings/SettingsNav'

const Settings: React.SFC<{}> = () => {

  return (
    <section className="settings page">
      <header>
        <h1>Settings</h1>
      </header>

      <SettingsNav />
    </section>
  )
}


export default Settings
