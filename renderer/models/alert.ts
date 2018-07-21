export enum ALERT {
  CREATE = 'trax/alert/CREATE_ALERT',
  DELETE = 'trax/alert/DELETE_ALERT'
}

export type Alert = {
  key?: any
  type: 'success' | 'warning' | 'error' | 'generic'
  dismissable?: boolean
  dismissAfter?: number
  message: string
}

export type Alerts = Alert[]

export type AlertAction = {
  readonly type: ALERT.CREATE | ALERT.DELETE
  readonly payload?: Alert
}
