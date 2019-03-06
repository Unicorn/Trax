import * as React from 'react'

type SelectOptionObject = {
  [key: string]: {
    label: string
    name?: string
    value?: string | number
  }
}

interface Props {
  name: string
  type: 'text' | 'select' | 'textarea'
  label: string
  options?: SelectOptionObject
}

const _renderSelectInput = (props: Props) => {
  const { name, options } = props

  if (!options)
    return null

  let validOpts = Object.keys(options).map(k => <option value={k}>{options[k].label}</option>)
  const opts = [<option />, ...validOpts]

  return (
    <select name={name} required>
      {opts}
    </select>
  )
}

const FormField: React.SFC<Props> = (props) => {
  const { name, type, label } = props
  let field = null

  switch (type) {
    case 'select' :
      field = _renderSelectInput(props)
      break
    case 'text' :
      field = <input name={name} type={type} required />
      break
    case 'textarea' :
      field = <textarea name={name} required></textarea>
      break
  }

  return (
    <div className={`field ${type}`}>
      {field}
      <label htmlFor={name}>{label}</label>
      <span />
    </div>
  )
}

export default FormField
