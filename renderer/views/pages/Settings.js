import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createAlert, clearAlerts } from 'controllers/alertController'

const Settings = ({ dispatch }) => {
  const _alertSuccess = () => {
    dispatch(
      createAlert({
        dismissable: true,
        type: 'success',
        message: 'this is a success alert!',
      })
    )
  }

  const _alertWarning = () => {
    dispatch(
      createAlert({
        dismissable: true,
        type: 'warning',
        message: 'this is a warning alert!',
      })
    )
  }

  const _alertError = () => {
    dispatch(
      createAlert({
        dismissable: true,
        type: 'error',
        message: 'this is an error alert!',
      })
    )
  }

  const _alertGeneric = () => {
    dispatch(
      createAlert({
        dismissAfter: 3000,
        type: 'generic',
        message: 'this is an alert!',
      })
    )
  }

  const _clearAlerts = () => {
    dispatch(clearAlerts())
  }

  return (
    <section className="settings page">
      <header>
        <h1>Settings</h1>
      </header>

      <ul>
        <li>
          <button className="small button" onClick={_alertGeneric}>
            Generic Alert w/ Timer
          </button>
        </li>
        <li>
          <button className="green small button" onClick={_alertSuccess}>
            Success Alert
          </button>
        </li>
        <li>
          <button className="yellow small button" onClick={_alertWarning}>
            Warning Alert
          </button>
        </li>
        <li>
          <button className="red small button" onClick={_alertError}>
            Error Alert
          </button>
        </li>
        <li>
          <button className="brown small button" onClick={_clearAlerts}>
            Clear Alerts
          </button>
        </li>
      </ul>
    </section>
  )
}

Settings.propTypes = {
  dispatch: PropTypes.func,
}

export default connect()(Settings)
