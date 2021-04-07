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
    activeOption,
    setActiveOption,
    topChoice,
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
      name="currency"
      options={options}
      value={activeOption}
      onChange={(e) => {
        e.preventDefault()
        setActiveOption(e.target.value)
      }}
    />
  )
}

SelectCurrency.propTypes = {
  activeOption: PropTypes.string.isRequired,
  setActiveOption: PropTypes.func.isRequired,
  topChoice: PropTypes.string,
}

SelectCurrency.defaultProps = {
  topChoice: '',
}

export default SelectCurrency
