import React from 'react'
// import PropTypes from 'prop-types'

import { WizardContext } from '@/app/contexts/WizardContext'

import Select from '@/elements/Select'
import Button from '@/elements/Button'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

import countries from '@/constants/countries'

const locationOptions = countries.map(({ id, name }) => {
  return {
    value: id,
    name,
  }
})

const GetStartedHomeCountryStep = () => {
  const [countryCode, setCountryCode] = React.useState(locationOptions[0].value)

  const { next } = React.useContext(WizardContext)

  const handleChange = (e) => {
    const { target: { value } } = e
    if (value === countryCode) return

    setCountryCode(value)
  }

  const handleNext = () => {
    next()
  }

  return (
    <div className="flex flex-1 flex-column justify-center items-center">
      <h2 className="w-full mb-16 font-normal text-xl">Where are you located?</h2>
      <div className="flex flex-column items-center w-1/3">
        <Select
          options={locationOptions}
          selectedValue={countryCode}
          name="ad_account"
          handleChange={handleChange}
          className="w-full mb-12"
        />
        <Button
          version="green"
          onClick={handleNext}
          className="w-48"
          trackComponentName="GetStartedHomeCountryStep"
        >
          Save
          <ArrowAltIcon
            className="ml-3"
            direction="right"
            fill="white"
          />
        </Button>
      </div>
    </div>
  )
}

GetStartedHomeCountryStep.propTypes = {
}

GetStartedHomeCountryStep.defaultProps = {
}

export default GetStartedHomeCountryStep
