import React from 'react'
import PropTypes from 'prop-types'

import GetStartedObjectiveButtonFooter from '@/app/GetStartedObjectiveButtonFooter'

import Button from '@/elements/Button'

import ArrowAltIcon from '@/icons/ArrowAltIcon'

import brandColors from '@/constants/brandColors'

const GetStartedObjectiveButton = ({
  objective,
  setSelectedObjective,
  selectedPlan,
  isDisabled,
}) => {
  const { name, value, color, plan } = objective

  return (
    <div className="flex flex-col w-full xs:w-1/3 mx-0 mb-4 xs:mx-4 xs:mb-0">
      <Button
        key={value}
        version={color}
        onClick={() => setSelectedObjective(value)}
        className="mb-1"
        trackComponentName="GetStartedObjectiveButton"
        disabled={isDisabled}
      >
        {name}
        <ArrowAltIcon
          className="ml-3"
          direction="right"
          fill={isDisabled ? brandColors.greyDark : brandColors.white}
        />
      </Button>
      {(! selectedPlan || isDisabled) && (
        <GetStartedObjectiveButtonFooter
          plan={plan}
          selectedPlan={selectedPlan}
          isDisabled={isDisabled}
        />
      )}
    </div>
  )
}

GetStartedObjectiveButton.propTypes = {
  objective: PropTypes.object.isRequired,
  setSelectedObjective: PropTypes.func.isRequired,
  selectedPlan: PropTypes.string,
  isDisabled: PropTypes.bool,
}

GetStartedObjectiveButton.defaultProps = {
  selectedPlan: '',
  isDisabled: false,
}

export default GetStartedObjectiveButton
