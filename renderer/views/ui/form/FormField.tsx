import * as React from 'react'
import { Field } from 'redux-form'

interface IProps {
  name: string
  type: string
  label: string
}

const FormField: React.SFC<IProps> = (props) => {
  const { name, type, label } = props

  return (
    <div className="field text">
      <Field
        name={name}
        component="input"
        type={type}
        required
      />
      <label htmlFor="title">{label}</label>
      <span />
    </div>
  )
}

export default FormField
