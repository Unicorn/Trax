import * as React from 'react'
import { connect } from 'react-redux'
import { createAlert } from 'controllers/alertController'
import { Alert } from 'models/alert'

interface Actions {
  createAlert: (payload: Alert) => any;
}

const Settings: React.SFC<Actions> = (props) => {
  const { createAlert } = props

  const _alertSuccess = () => createAlert({
    dismissable: true,
    type: 'success',
    message: 'this is a success alert!',
  })

  const _alertWarning = () => createAlert({
    dismissable: true,
    type: 'warning',
    message: 'this is a warning alert!',
  })

  const _alertError = () => createAlert({
    dismissable: true,
    type: 'error',
    message: 'this is an error alert!',
  })

  const _alertGeneric = () => createAlert({
    dismissAfter: 3000,
    type: 'generic',
    message: 'this is an alert!',
  })

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
      </ul>
    </section>
  )
}

const mapDispatch = ({
  createAlert
})

export default connect(null, mapDispatch)(Settings)
