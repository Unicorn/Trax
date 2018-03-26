import React from 'react'
import { GenericField, Field } from 'redux-form'

interface FormFieldProps extends GenericField<any> {
  label: string;
  type: string;
  component: React.StatelessComponent<any>;
}

const FormField: React.SFC<FormFieldProps> = (props) => {
  if (props.type && props.type === 'radio') {
    return (
      <div className={`field ${props.type}`}>
        <label>
          <Field name={props.name} component={props.component} {...props} />
          <span>{props.label}</span>
        </label>
      </div>
    )
  } else if (props.type && ['text', 'textarea'].includes(props.type)) {
    return (
      <div className={`field ${props.type}`}>
        <Field name={props.name} component={props.component} {...props} />
        <label htmlFor={props.name}>{props.label}</label>
        <span />
      </div>
    )
  } else {
    return (
      <div className={`field ${props.type}`}>
        <Field name={props.name} component={props.component} {...props} />
      </div>
    )
  }
}

export default FormField
