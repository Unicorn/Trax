import * as React from 'react'
import { FieldProps, OptionsObject } from './index'
import ChevronDownIcon from '@/views/ui/icons/ChevronDownIcon'

interface Props extends FieldProps {
  type: 'select' | 'textarea' | 'toggle' | 'group' | 'tabs'
  onChange: (e: React.SyntheticEvent<HTMLSelectElement>) => void
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

const SelectField: React.SFC<Props> = (props) => {
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

  const _onChange = (e: React.SyntheticEvent<HTMLSelectElement>) => {
    validate && !valid && _validate(e.currentTarget.value)
    onChange(e)
  }

  const _onBlur = (e: React.SyntheticEvent<HTMLSelectElement>) => {
    validate && _validate(e.currentTarget.value)
  }

  return (
    <div className={className}>
      <select name={name} {...inputProps} onChange={_onChange} onBlur={_onBlur}>
        {_renderSelectOptions(options)}
      </select>
      <label htmlFor={name}>{label}</label>
      <ChevronDownIcon />
      <span />
    </div>
  )
}

export default SelectField
