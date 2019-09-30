/** @jsx createElement **/
import { createElement, SFC, useState, ReactNode } from 'react'
import { FieldProps, OptionsObject } from './index'

interface Props extends FieldProps {
  type: 'toggle' | 'group' | 'tabs'
  onChange: (e: React.SyntheticEvent<HTMLInputElement>) => void
}

const _renderRadioOptions = (props: Props, options?: OptionsObject): ReactNode => {
  if (!options) return null

  const { name, selected, onChange } = props

  return Object.keys(options).map(k => (
    <label key={k} className={selected === k ? 'active' : ''}>
      <input type="radio" name={name} value={k} checked={selected == k} onChange={onChange} />
      <span>{options[k].label}</span>
    </label>
  ))
}

const RadioField: SFC<Props> = props => {
  const { name, type, label, options, validate, onValid, onInvalid, onChange, ...inputProps } = props
  const field = null

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

  const _onChange = (e: React.SyntheticEvent<HTMLInputElement>): void => {
    validate && !valid && _validate(e.currentTarget.value)
    onChange(e)
  }

  const _onBlur = (e: React.SyntheticEvent<HTMLInputElement>): void => {
    validate && _validate(e.currentTarget.value)
  }

  switch (type) {
    case 'toggle':
      return (
        <label className={className}>
          <input name={name} type="checkbox" {...inputProps} onChange={_onChange} onBlur={_onBlur} />
          <span className="slider"></span>
          <strong>{label}</strong>
        </label>
      )
    case 'group':
    case 'tabs':
      return (
        <div className={className}>
          <span className="header">{label}</span>
          <div className="options">{_renderRadioOptions(props, options)}</div>
        </div>
      )
    default:
      return (
        <div className={className}>
          {field}
          <label htmlFor={name}>{label}</label>
          <span />
        </div>
      )
  }
}

export default RadioField
