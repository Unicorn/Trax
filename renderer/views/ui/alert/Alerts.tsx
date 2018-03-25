import * as React from 'react'
import { connect } from 'react-redux'
import Alert from './Alert'
import { TAlerts } from 'types/alert'

type TAlertsProps = {
  alerts: TAlerts;
}

const Alerts: React.SFC<TAlertsProps> = (props) => {
  const { alerts } = props

  if (!alerts || alerts.length < 1) {
    return null
  }

  return (
    <div className="alerts">
      {alerts.map(n => <Alert payload={n} key={n.id} />)}
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  alerts: state.alerts
})

export default connect(mapStateToProps)(Alerts)
