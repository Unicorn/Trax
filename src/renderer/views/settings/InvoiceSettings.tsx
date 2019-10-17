/** @jsx createElement **/
import { createElement, SFC } from 'react'
import { connect } from 'react-redux'
import { UI } from 'horseshoes'
import { setInvoicesSettings } from '@/controllers/settingController'
import { RootState } from '@/models/app'
import { Settings } from '@/models/setting'

interface Connected {
  settings: Settings
}

interface Actions {
  _setInvoicesSettings: typeof setInvoicesSettings
}

const InvoiceSettings: SFC<Connected & Actions> = ({ settings, _setInvoicesSettings }) => {
  return (
    <div className="fixed box bottom">
      <UI.form.TextField
        type="text"
        name="rate"
        label="Hourly Rate"
        value={settings.invoices.rate}
        onChange={({ currentTarget: { name, value } }) => _setInvoicesSettings(name, value.replace(/\D+/g, ''))}
      />
    </div>
  )
}

const mapState = (state: RootState): Connected => ({
  settings: state.settings
})

const mapDispatch: Actions = {
  _setInvoicesSettings: setInvoicesSettings
}

export default connect(
  mapState,
  mapDispatch
)(InvoiceSettings)
