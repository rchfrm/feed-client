import React from 'react'
import PropTypes from 'prop-types'

import produce from 'immer'

import Select from '@/elements/Select'

import facebookCurrencies from '@/constants/facebookCurrencies'

import { sortArrayByKey } from '@/helpers/utils'

const selectOptions = Object.entries(facebookCurrencies).map(([code, title]) => {
  const value = code
  const name = ` (${code}) ${title}`
  return { value, name }
})

const selectOptionsSorted = sortArrayByKey(selectOptions, 'value')

const SelectCurrency = (props) => {
  const {
    value,
    setValue,
    topChoice,
    placeholder,
  } = props

  // PUT FIRST CHOICE ON TOP
  const [options, setOptions] = React.useState([])
  React.useEffect(() => {
    if (!topChoice) return setOptions(selectOptionsSorted)
    const optionsReSorted = produce(selectOptionsSorted, draftState => {
      const index = draftState.findIndex(({ value }) => value === topChoice)
      const topChoiceItem = index !== -1 ? draftState[index] : null
      if (!topChoiceItem) return
      draftState.splice(index, 1)
      draftState.unshift(topChoiceItem)
    })
    setOptions(optionsReSorted)
  }, [topChoice])

  return (
    <Select
      {...props}
      placeholder={topChoice ? null : placeholder}
      name="currency"
      options={options}
      selectedValue={value}
      handleChange={(e) => {
        e.preventDefault()
        setValue(e.target.value)
      }}
    />
  )
}

SelectCurrency.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  topChoice: PropTypes.string,
}

SelectCurrency.defaultProps = {
  topChoice: '',
}

export default SelectCurrency
