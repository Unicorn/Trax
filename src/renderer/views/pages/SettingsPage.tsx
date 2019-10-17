/** @jsx createElement **/
import { createElement, SFC } from 'react'

import BoardSettings from '@/views/settings/BoardSettings'
import AppSettings from '@/views/settings/AppSettings'
import TemplateSettings from '@/views/settings/TemplateSettings'
import GoogleSheetsSettings from '@/views/settings/GoogleSheetsSettings'
import InvoiceSettings from '@/views/settings/InvoiceSettings'

const SettingsPage: SFC<{}> = () => {
  return (
    <section className="settings page">
      <div className="golden-ratio columns">
        <div className="left column">
          <BoardSettings />
          <GoogleSheetsSettings />
          <InvoiceSettings />
          <AppSettings />
        </div>

        <div className="right column">
          <TemplateSettings />
        </div>
      </div>
    </section>
  )
}

export default SettingsPage
