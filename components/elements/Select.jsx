// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
// IMPORT ELEMENTS
import Input from './Input'
// IMPORT PAGES
// IMPORT ASSETS
// IMPORT CONSTANTS
// IMPORT HELPERS
// IMPORT STYLES

function Select({
  selectedOption,
  label,
  options,
  name,
  contactUs,
  onChange,
  hasError,
}) {
  const errorClass = hasError ? '_error' : ''
  console.log('hasError', hasError)

  let selectedOptionValue = ''
  if (selectedOption) {
    if (selectedOption.length === 2) {
      selectedOption = options.find(option => {
        return option.id === selectedOption
      })
      selectedOptionValue = `${selectedOption.name} (${selectedOption.id})`
    }
  }

  const labelEl = label ? <label className={`label_${label.position}`}>{label.text}</label> : null

  let select
  if (options.length === 1) {
    select = (
      <Input
        name={name}
        placeholder=""
        value={`${options[0].name} (${options[0].id})`}
        onChange={contactUs}
        type="text"
        label="none"
        version="text"
      />
    )
  } else {
    const optionsEl = options.map(option => {
      let text = option.id
      if (option.name && option.name !== '===============') {
        text = `${option.name} (${option.id})`
      }
      if (option.id === 'choose') {
        text = `${option.name}`
      }
      return <option key={option.id}>{text}</option>
    })
    select = (
      <select
        name={name}
        onChange={onChange}
        value={selectedOptionValue}
      >
        {optionsEl}
      </select>
    )
  }

  return (
    <div className={['selectElement', errorClass].join(' ')}>
      {labelEl}
      {select}
    </div>
  )
}

export default Select
