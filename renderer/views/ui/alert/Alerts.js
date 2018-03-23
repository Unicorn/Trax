import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import uuid from 'uuid/v4'
import Alert from './Alert'

const select = state => ({ alerts: state.alerts })

const Alerts = ({ alerts }) => {
  if (!alerts || alerts.length < 1) return null

  return (
    <div className="alerts">
      {alerts.map(n => <Alert data={n} key={uuid()} />)}
    </div>
  )
}

Alerts.propTypes = {
  alerts: PropTypes.array,
}

Alerts.defaultProps = {
  alerts: [],
}

export default connect(select)(Alerts)
