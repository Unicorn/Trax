import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'

const FormField = ({ children, name, label, component, ...props }) => {
  if (props.type && props.type === 'radio') {
    return (
      <div className={`field ${props.type}`}>
        <label>
          <Field name={name} component={component} {...props}>
            {children}
          </Field>
          <span>{label}</span>
        </label>
      </div>
    )
  } else if (props.type && ['text', 'textarea'].includes(props.type)) {
    return (
      <div className={`field ${props.type}`}>
        <Field name={name} component={component} {...props}>
          {children}
        </Field>
        <label htmlFor={name}>{label}</label>
        <span />
      </div>
    )
  } else {
    return (
      <div className={`field ${props.type}`}>
        <Field name={name} component={component} {...props} />
      </div>
    )
  }
}

FormField.propTypes = {
  children: PropTypes.node,
  component: PropTypes.node.isRequired,
  error: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}

export default FormField
