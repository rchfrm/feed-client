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

function Select(props) {
  let selectedOption
  if (props.selectedOption) {
    if (props.selectedOption.length === 2) {
      selectedOption = props.options.find(option => {
        return option.id === props.selectedOption
      })
      selectedOption = `${selectedOption.name} (${selectedOption.id})`
    }
  }
  let label
  if (props.label) {
    label = (
      <label className={`label_${props.label.position}`}>{props.label.text}</label>
    )
  }
  let select
  if (props.options.length === 1) {
    select = (
      <Input
        name={props.name}
        placeholder=""
        value={`${props.options[0].name} (${props.options[0].id})`}
        onChange={props.contactUs}
        type="text"
        label="none"
        version="text"
      />
    )
  } else {
    const options = props.options.map(option => {
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
        name={props.name}
        onChange={props.onChange}
        value={selectedOption}
      >
        {options}
      </select>
    )
  }

  return (
    <div>
      {label}
      {select}
    </div>
  )
}

export default Select
