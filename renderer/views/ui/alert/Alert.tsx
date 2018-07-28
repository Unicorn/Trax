import * as React from 'react'
import { connect } from 'react-redux'

import { deleteAlert } from 'controllers/alertController'
import { Alert } from 'models/alert'
import CloseIcon from 'views/ui/icons/CloseIcon'

type AlertProps = {
  alert: Alert;
  deleteAlert: (id: any) => any;
}

const Alert: React.SFC<AlertProps> = (props) => {
  const { deleteAlert, alert } = props

  return (
    <div className={`alert ${alert.type}`}>
      {alert.message}

      {alert.dismissable && (<button onClick={() => { deleteAlert(alert) }} className="close icon">
        <CloseIcon />
      </button>)}
    </div>
  )
}

export default connect(null, { deleteAlert })(Alert)
