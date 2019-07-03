/** @jsx createElement */
import { createElement, SFC } from 'react'
import { connect } from 'react-redux'
import { toArray, deleteAlert, Alert } from 'horseshoes'

import { RootState } from '@/models/app'
import AlertItem from './AlertItem'

interface Connected {
  alerts: Alert[]
}

interface Actions {
  _deleteAlert: typeof deleteAlert
}

const AlertsList: SFC<Connected & Actions> = props => {
  const { alerts, _deleteAlert } = props

  if (!alerts || alerts.length < 1) return null

  return (
    <div className="alerts">
      {alerts.map(alert => (
        <AlertItem alert={alert} dismissHandler={_deleteAlert} key={alert.key} />
      ))}
    </div>
  )
}

const mapState = (state: RootState): Connected => ({
  alerts: toArray(state.alerts) as Alert[]
})

const mapDispatch = {
  _deleteAlert: deleteAlert
}

export default connect(
  mapState,
  mapDispatch
)(AlertsList)
