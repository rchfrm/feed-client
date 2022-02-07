import React from 'react'
// import PropTypes from 'prop-types'

import { WizardContext } from '@/app/contexts/WizardContext'

import Select from '@/elements/Select'
import Button from '@/elements/Button'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

const adAccountOptions = [
  {
    name: 'Profile A',
    value: 'A',
  },
  {
    name: 'Profile B',
    value: 'B',
  },
  {
    name: 'Profile C',
    value: 'C',
  },
]

const GetStartedAdAccountStep = () => {
  const [adAccountId, setAdAccountId] = React.useState('')
  const { goToStep, wizardState } = React.useContext(WizardContext)

  const handleChange = (e) => {
    const { target: { value } } = e
    if (value === adAccountId) return

    setAdAccountId(value)
  }

  const handleNext = () => {
    const nextStep = wizardState.objective === 'growth' ? 8 : 9
    goToStep(nextStep)
  }

  return (
    <div className="flex flex-1 flex-column justify-center items-center">
      <h2 className="w-full mb-16 font-normal text-xl">Which Facebook ad account would you like Feed to use?</h2>
      <div className="flex flex-column items-center w-1/3">
        <Select
          options={adAccountOptions}
          selectedValue={adAccountId}
          name="ad_account"
          handleChange={handleChange}
          className="w-full mb-12"
        />
        <Button
          version="green"
          onClick={handleNext}
          className="w-48"
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

GetStartedAdAccountStep.propTypes = {
}

GetStartedAdAccountStep.defaultProps = {
}

export default GetStartedAdAccountStep
