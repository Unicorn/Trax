import * as React from 'react'
import { FieldProps } from './index'

interface Props extends FieldProps {
  type: 'textarea'
  onChange: (e: React.SyntheticEvent<HTMLTextAreaElement>) => void
}

const TextAreaField: React.SFC<Props> = (props) => {
  const {
    name,
    type,
    label,
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

  const _onChange = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    validate && !valid && _validate(e.currentTarget.value)
    onChange(e)
  }

  const _onBlur = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    validate && _validate(e.currentTarget.value)
  }

  return (
    <div className={className}>
      <textarea name={name} {...inputProps} onChange={_onChange} onBlur={_onBlur}></textarea>
      <label htmlFor={name}>{label}</label>
      <span />
    </div>
  )
}

export default TextAreaField
