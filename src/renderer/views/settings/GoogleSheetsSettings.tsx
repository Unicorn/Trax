/** @jsx createElement **/
import { createElement, SFC, ReactNode } from 'react'
import { connect } from 'react-redux'
import { UI } from 'horseshoes'
import { OptionsObject } from 'horseshoes/build/main/lib/views/form/types'
import { setSpreadsheetId, setSheet, logout } from '@/controllers/googleController'
import { requestAuth } from '@/controllers/googleController'
import { RootState } from '@/models/app'
import { GoogleAuth, GoogleTimesheet } from '@/models/google'

interface Connected {
  auth: GoogleAuth
  timesheet: GoogleTimesheet
}

interface Actions {
  _requestAuth: typeof requestAuth
  _logout: typeof logout
  _setSpreadsheetId: typeof setSpreadsheetId
  _setSheet: typeof setSheet
}

const GoogleSettings: SFC<Connected & Actions> = ({ auth, timesheet, _requestAuth, _logout, _setSpreadsheetId, _setSheet }) => {
  const _renderFields = (): ReactNode => {
    if (auth.accessToken && !timesheet.validId) {
      return (
        <UI.form.TextField
          type="text"
          name="googleSheetId"
          label="Google Timesheet ID"
          value={timesheet.spreadsheetId}
          onChange={({ currentTarget: { value } }) => _setSpreadsheetId(value)}
        />
      )
    }

    if (auth.accessToken && timesheet.validId && timesheet.sheets && timesheet.sheets.length > 0) {
      const options: OptionsObject = {}
      timesheet.sheets.forEach(({ properties }) => {
        if (!properties) return
        const { title, sheetId } = properties

        if (!title || sheetId === undefined || sheetId === null) return
        options[sheetId] = { label: title, value: sheetId }
      })

      return (
        <UI.form.SelectField
          type="select"
          name="googleSheetName"
          label="Google Sheet"
          value={timesheet.sheetId !== undefined ? timesheet.sheetId.toString() : ''}
          options={options}
          onChange={({ currentTarget: { value } }) => _setSheet(parseInt(value), options[value].label)}
        />
      )
    }

    return null
  }

  const _renderActions = (): ReactNode => {
    const actions = []

    if (!auth.accessToken)
      actions.push(
        <button key="connect" className="small blue button" onClick={_requestAuth}>
          Connect Google
        </button>
      )

    if (auth.accessToken) {
      actions.push(
        <button key="logout" className="small red button" onClick={_logout}>
          Disconnect Google
        </button>
      )
    }

    return actions
  }

  return (
    <div className="fixed box bottom">
      {_renderFields()}
      {_renderActions()}
    </div>
  )
}

const mapState = (state: RootState): Connected => ({
  auth: state.google.auth,
  timesheet: state.google.timesheet
})

const mapDispatch: Actions = {
  _requestAuth: requestAuth,
  _logout: logout,
  _setSpreadsheetId: setSpreadsheetId,
  _setSheet: setSheet
}

export default connect(
  mapState,
  mapDispatch
)(GoogleSettings)
