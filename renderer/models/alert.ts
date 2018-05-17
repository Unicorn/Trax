export const CREATE_ALERT = 'trax/alert/CREATE_ALERT'
export const DELETE_ALERT = 'trax/alert/DELETE_ALERT'
export const CLEAR_ALERTS = 'trax/alert/CLEAR_ALERTS'

export type Alert = {
  key?: any;
  type: 'success' | 'warning' | 'error' | 'generic';
  dismissable?: boolean;
  dismissAfter?: number;
  message: string;
}

export type Alerts = Alert[]

export interface CreateAlert {
  type: typeof CREATE_ALERT;
  payload?: Alert;
}

export interface DeleteAlert {
  type: typeof DELETE_ALERT;
  payload?: Alert;
}

export type AlertAction = CreateAlert | DeleteAlert;
