export const CREATE_ALERT = 'CREATE_ALERT'
export const DELETE_ALERT = 'DELETE_ALERT'
export const CLEAR_ALERTS = 'CLEAR_ALERTS'

export type TAlert = {
  id?: any;
  type: 'success' | 'warning' | 'error' | 'generic';
  dismissable?: boolean;
  dismissAfter?: number;
  message: string;
}

export type TAlerts = TAlert[]

export interface IACreateAlert {
  type: typeof CREATE_ALERT;
  payload: TAlert;
}

export interface IADeleteAlert {
  type: typeof DELETE_ALERT;
  payload: TAlert;
}

export interface IAClearAlerts {
  type: typeof CLEAR_ALERTS;
}

export type TAlertActions = IACreateAlert | IADeleteAlert | IAClearAlerts
