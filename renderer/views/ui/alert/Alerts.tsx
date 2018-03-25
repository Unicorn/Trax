import * as React from 'react'
import { connect } from 'react-redux'
import AlertMessage from './Alert'
import { Alert } from 'types/alert'

type AlertsProps = {
  alerts: Alert[];
}

const Alerts: React.SFC<AlertsProps> = (props) => {
  const { alerts } = props

  if (!alerts || alerts.length < 1) {
    return null
  }

  return (
    <div className="alerts">
      {alerts.map(n => <AlertMessage payload={n} key={n.id} />)}
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  alerts: state.alerts
})

export default connect(mapStateToProps)(Alerts)
