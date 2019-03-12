import * as React from 'react'

export type OptionsObject = {
  [key: string]: {
    label: string
    name?: string
    value?: string | number
  }
}

interface Props {
  name: string
  type: 'text' | 'select' | 'textarea' | 'toggle' | 'group' | 'tabs'
  label: string
  options?: OptionsObject
  selected?: string
  required?: boolean
  checked?: boolean
  value?: any
  onChange?: (e: any) => void
}

const _renderSelectOptions = (options?: OptionsObject) => {
  let items = [<option />]

  if (!options)
    return items

  Object.keys(options).forEach(k =>
    items.push(<option value={k}>{options[k].label}</option>)
  )

  return items
}

const _renderRadioOptions = (props: Props, options?: OptionsObject) => {
  if (!options)
    return null

  const { name, selected, onChange } = props

  return Object.keys(options).map(k => (
    <label className={selected === k ? 'active' : ''}>
      <input type="radio" name={name} value={k} checked={selected == k} onChange={onChange} />
      <span>{options[k].label}</span>
    </label>
  ))
}

export const FormField: React.SFC<Props> = (props) => {
  const { name, type, label, options, selected, ...rest } = props
  let field = null

  switch (type) {
    case 'select' :
      field = <select name={name} {...rest}>{_renderSelectOptions(options)}</select>
      break
    case 'text' :
      field = <input name={name} type={type} {...rest} />
      break
    case 'toggle' :
      field = <input name={name} type="checkbox" {...rest} />
      break
    case 'textarea' :
      field = <textarea name={name} {...rest}></textarea>
      break
  }

  switch (type) {
    case 'toggle' :
      return (
        <label className={`field ${type}`}>
          {field}
          <span className="slider"></span>
          <strong>{label}</strong>
        </label>
      )
    case 'group' :
    case 'tabs' :
      return (
        <div className={`field ${type}`}>
          <span className="header">{label}</span>
          <div className="options">{_renderRadioOptions(props, options)}</div>
        </div>
      )
    default :
      return (
        <div className={`field ${type}`}>
          {field}
          <label htmlFor={name}>{label}</label>
          <span />
        </div>
      )
  }
}
