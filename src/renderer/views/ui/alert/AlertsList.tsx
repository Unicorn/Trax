import * as React from 'react'
import { connect } from 'react-redux'

import { deleteAlert } from '@/controllers/alertController'
import { AppState, toArray } from '@/models/app'
import { Alert, AlertAction } from '@/models/alert'
import AlertItem from './AlertItem'

interface Props {
  alerts: Alert[]
}

interface Actions {
  deleteAlert: (payload: Alert) => AlertAction
}

const AlertsList: React.SFC<Props & Actions> = (props) => {
  const { alerts, deleteAlert } = props

  if (!alerts || alerts.length < 1)
    return null

  return (
    <div className="alerts">
      {alerts.map(alert => <AlertItem alert={alert} dismissHandler={deleteAlert} key={alert.key} />)}
    </div>
  )
}

const mapState = (state: AppState) => ({
  alerts: toArray(state.alerts) as Alert[]
})

const mapDispatch = ({
  deleteAlert
})

export default connect(mapState, mapDispatch)(AlertsList)
