export enum ALERT {
  CREATE = 'trax/alert/CREATE_ALERT',
  DELETE = 'trax/alert/DELETE_ALERT'
}

export interface Alert {
  key: string
  status: 'success' | 'warning' | 'error' | 'generic'
  message: string
  dismissable?: boolean
  dismissAfter?: number
}

export interface AlertAction {
  readonly type: ALERT
  readonly payload: Alert
}
