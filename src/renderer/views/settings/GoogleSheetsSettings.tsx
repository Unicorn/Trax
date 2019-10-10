/** @jsx createElement **/
import { createElement, SFC, ReactNode, Fragment } from 'react'
import { connect } from 'react-redux'
import { setAuthKey, setAuthSecret, setAuthCode, setSheetId, logout } from '@/controllers/googleController'
import { requestAuth, refreshAuthToken } from '@/controllers/googleController'
import { RootState } from '@/models/app'
import { GoogleAuth, GoogleTimesheet } from '@/models/google'
import Form from '@/views/ui/form'

interface Props {
}

interface Connected {
  auth: GoogleAuth
  timesheet: GoogleTimesheet
}

interface Actions {
  _requestAuth: typeof requestAuth
  _refreshAuthToken: typeof refreshAuthToken
  _logout: typeof logout
  _setAuthKey: typeof setAuthKey
  _setAuthSecret: typeof setAuthSecret
  _setAuthCode: typeof setAuthCode
  _setSheetId: typeof setSheetId
}

const GoogleSettings: SFC<Props & Connected & Actions> = ({ auth, timesheet, _requestAuth, _refreshAuthToken, _logout, _setAuthKey, _setAuthSecret, _setSheetId }) => {

  const _renderFields = (): ReactNode => {
    if (auth.token)
      return (
        <Form.TextField
          type="text"
          name="googleSheetId"
          label="Google Timesheet ID"
          value={timesheet.id}
          onChange={({ currentTarget: { value } }) => _setSheetId(value)}
        />
      )

    return (
      <Fragment>
        <Form.TextField
          type="text"
          name="googleKey"
          label="Google Sheets API Key"
          value={auth.key}
          onChange={({ currentTarget: { value } }) => _setAuthKey(value)}
        />

        <Form.TextField
          type="text"
          name="googleSecret"
          label="Google Sheets API Secret"
          value={auth.secret}
          onChange={({ currentTarget: { value } }) => _setAuthSecret(value)}
        />
      </Fragment>
    )
  }

  const _renderActions = (): ReactNode => {
    let actions = []

    if (!auth.key || !auth.secret || !auth.token)
      actions.push(
        <button className="small blue button" disabled={auth.key && auth.secret ? false : true} onClick={_requestAuth}>
          Connect Google
        </button>
      )

    if (auth.key && auth.secret && auth.token)
      actions.push(
        <button className="small yellow button" onClick={_refreshAuthToken}>
          Refresh Token
        </button>
      )

    if (auth.key && auth.secret && auth.token)
      actions.push(
        <button className="small red button" onClick={_logout}>
          Disconnect Google
        </button>
      )

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
  _refreshAuthToken: refreshAuthToken,
  _logout: logout,
  _setAuthKey: setAuthKey,
  _setAuthSecret: setAuthSecret,
  _setAuthCode: setAuthCode,
  _setSheetId: setSheetId,
}


export default connect(
  mapState,
  mapDispatch
)(GoogleSettings)
