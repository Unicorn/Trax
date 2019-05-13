import * as React from 'react'
import ChevronDownIcon from 'views/ui/icons/ChevronDownIcon'

export type OptionsObject = {
  [key: string]: {
    label: string
    name?: string
    value?: string | number
  }
}

interface Props {
  name: string
  type: 'text' | 'email' | 'password' | 'select' | 'textarea' | 'toggle' | 'group' | 'tabs'
  label: string
  options?: OptionsObject
  selected?: string
  required?: boolean
  checked?: boolean
  value?: string

  validate?: (value: string) => [boolean, string]
  onValid?: () => void
  onInvalid?: (error: string) => void
  onChange: (e: React.SyntheticEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
}

const _renderSelectOptions = (options?: OptionsObject) => {
  let items = [<option key="default" />]

  if (!options)
    return items

  Object.keys(options).forEach(k =>
    items.push(<option key={k} value={k}>{options[k].label}</option>)
  )

  return items
}

const _renderRadioOptions = (props: Props, options?: OptionsObject) => {
  if (!options)
    return null

  const { name, selected, onChange } = props

  return Object.keys(options).map(k => (
    <label key={k} className={selected === k ? 'active' : ''}>
      <input type="radio" name={name} value={k} checked={selected == k} onChange={onChange} />
      <span>{options[k].label}</span>
    </label>
  ))
}

export const FormField: React.SFC<Props> = (props) => {
  const {
    name,
    type,
    label,
    options,
    selected,
    validate,
    onValid,
    onInvalid,
    onChange,
    ...inputProps
  } = props

  let field = null

  const [valid, setValid] = React.useState(true)
  let className = `field ${type} `
  className += validate && valid ? 'valid ' : 'invalid '
  className += inputProps.value && inputProps.value.length > 0 ? 'not-empty ' : 'empty '

  const _validate = (value: string) => {
    if (!validate) return
    let [valid, error] = validate(value)
    valid === true && onValid && onValid()
    valid !== true && onInvalid && onInvalid(error)
    setValid(valid === true)
  }

  const _onChange = (e: React.SyntheticEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    validate && !valid && _validate(e.currentTarget.value)
    onChange(e)
  }

  const _onBlur = (e: React.SyntheticEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    validate && _validate(e.currentTarget.value)
  }

  switch (type) {
    case 'select' :
      field = (
        <select name={name} {...inputProps} onChange={_onChange} onBlur={_onBlur}>
          {_renderSelectOptions(options)}
        </select>
      )
      break
    case 'text' :
    case 'email' :
    case 'password' :
      field = <input name={name} type={type} {...inputProps} onChange={_onChange} onBlur={_onBlur} />
      break
    case 'toggle' :
      field = <input name={name} type="checkbox" {...inputProps} onChange={_onChange} onBlur={_onBlur} />
      break
    case 'textarea' :
      field = <textarea name={name} {...inputProps} onChange={_onChange} onBlur={_onBlur}></textarea>
      break
  }

  switch (type) {
    case 'toggle' :
      return (
        <label className={className}>
          {field}
          <span className="slider"></span>
          <strong>{label}</strong>
        </label>
      )
    case 'group' :
    case 'tabs' :
      return (
        <div className={className}>
          <span className="header">{label}</span>
          <div className="options">{_renderRadioOptions(props, options)}</div>
        </div>
      )
    case 'select' :
      return (
        <div className={className}>
          {field}
          <label htmlFor={name}>{label}</label>
          <ChevronDownIcon />
          <span />
        </div>
      )
    default :
      return (
        <div className={className}>
          {field}
          <label htmlFor={name}>{label}</label>
          <span />
        </div>
      )
  }
}
