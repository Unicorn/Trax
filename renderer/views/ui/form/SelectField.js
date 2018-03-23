import React from 'react'
import Select from 'react-select'

const SelectField = ({ label, type, input, options, ...props }) => {
  return (
    <div className={`field ${type}`}>
      <Select
        value={input.value}
        onChange={input.onChange}
        onBlur={() => input.onBlur(input.value)}
        options={options}
        placeholder={label}
        simpleValue
      />
    </div>
  )
}

export default SelectField
