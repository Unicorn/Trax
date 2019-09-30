/** @jsx createElement **/
import { createElement, SFC, useState } from 'react'
import { FieldProps } from './index'

interface Props extends FieldProps {
  type: 'text' | 'email' | 'password'
  onChange: (e: React.SyntheticEvent<HTMLInputElement>) => void
}

const TextField: SFC<Props> = ({ name, type, label, validate, onValid, onInvalid, onChange, ...inputProps }) => {
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

  return (
    <div className={className}>
      <input name={name} type={type} {...inputProps} onChange={_onChange} onBlur={_onBlur} />
      <label htmlFor={name}>{label}</label>
      <span />
    </div>
  )
}

export default TextField
