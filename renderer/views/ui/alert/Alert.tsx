import React from 'react'
import { connect } from 'react-redux'
import { deleteAlert } from 'controllers/alertController'
import { TAlert } from 'types/alert'
import CloseIcon from 'views/ui/icons/CloseIcon'

type TAlertProps = {
  payload: TAlert;
  deleteAlert: (id: any) => any;
}

const Alert: React.SFC<TAlertProps> = (props) => {
  const { deleteAlert, payload: { id, type, message, dismissable } } = props

  return (
    <div className={`alert ${type}`}>
      {message}

      {dismissable && (<button onClick={() => { deleteAlert(id) }} className="close icon">
        <CloseIcon />
      </button>)}
    </div>
  )
}

export default connect(null, { deleteAlert })(Alert)
