/** @jsx createElement **/
import { createElement, SFC, useState, ReactNode } from 'react'
import { FieldProps, OptionsObject } from './index'
import ChevronDownIcon from '@/views/ui/icons/ChevronDownIcon'

interface Props extends FieldProps {
  type: 'select' | 'textarea' | 'toggle' | 'group' | 'tabs'
  onChange: (e: React.SyntheticEvent<HTMLSelectElement>) => void
}

const _renderSelectOptions = (options?: OptionsObject): ReactNode => {
  const items = [<option key="default" />]

  if (!options) return items

  Object.keys(options).forEach(k =>
    items.push(
      <option key={k} value={k}>
        {options[k].label}
      </option>
    )
  )

  return items
}

const SelectField: SFC<Props> = ({ name, type, label, options, validate, onValid, onInvalid, onChange, ...inputProps }) => {
  const [valid, setValid] = useState(true)
  let className = `field ${type} `
  className += validate && valid ? 'valid ' : 'invalid '
  className += inputProps.value && inputProps.value.length > 0 ? 'not-empty ' : 'empty '

  const _validate = (value: string): void => {
    if (!validate) return
    const [valid, error] = validate(value)
    valid === true && onValid && onValid()
    valid !== true && onInvalid && onInvalid(error)
    setValid(valid === true)
  }

  const _onChange = (e: React.SyntheticEvent<HTMLSelectElement>): void => {
    validate && !valid && _validate(e.currentTarget.value)
    onChange(e)
  }

  const _onBlur = (e: React.SyntheticEvent<HTMLSelectElement>): void => {
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
