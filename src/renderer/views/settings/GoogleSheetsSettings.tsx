/** @jsx createElement **/
import { createElement, SFC, ReactNode, Fragment } from 'react'
import { connect } from 'react-redux'
import { setAuthKey, setAuthSecret, setAuthCode, setSheetId } from '@/controllers/googleController'
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
  _setAuthKey: typeof setAuthKey
  _setAuthSecret: typeof setAuthSecret
  _setAuthCode: typeof setAuthCode
  _setSheetId: typeof setSheetId
}

const GoogleSettings: SFC<Props & Connected & Actions> = ({ auth, timesheet, _requestAuth, _refreshAuthToken, _setAuthKey, _setAuthSecret, _setAuthCode, _setSheetId }) => {

  const _renderSheetIdField = (): ReactNode => (
    <Fragment>
      <Form.TextField
        type="text"
        name="googleSheetId"
        label="Google Timesheet ID"
        value={timesheet.id}
        onChange={({ currentTarget: { value } }) => _setSheetId(value)}
      />

      <button className="small yellow button" onClick={_refreshAuthToken}>
        Refresh Token
      </button>
    </Fragment>
  )

  return (
    <div className="fixed box bottom">
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

      {auth.code && _renderSheetIdField()}

      <button className="small blue button" disabled={auth.key && auth.secret ? false : true} onClick={_requestAuth}>
        Connect Google
      </button>
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
  _setAuthKey: setAuthKey,
  _setAuthSecret: setAuthSecret,
  _setAuthCode: setAuthCode,
  _setSheetId: setSheetId,
}


export default connect(
  mapState,
  mapDispatch
)(GoogleSettings)
