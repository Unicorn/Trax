import * as React from 'react'

import { Alert } from '@/models/alert'
import CloseIcon from '@/views/ui/icons/CloseIcon'

interface Props {
  alert: Alert
  dismissHandler: (alert: Alert) => void
}

const AlertItem: React.SFC<Props> = (props) => {
  const { dismissHandler, alert } = props

  return (
    <div className={`alert ${alert.status}`}>
      {alert.message}
      {alert.dismissable && (<button onClick={() => { dismissHandler(alert) }} className="close icon"><CloseIcon /></button>)}
    </div>
  )
}



export default AlertItem
