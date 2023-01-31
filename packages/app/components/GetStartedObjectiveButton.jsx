import React from 'react'
import PropTypes from 'prop-types'
import GetStartedObjectiveButtonFooter from '@/app/GetStartedObjectiveButtonFooter'
import Button from '@/elements/Button'
import ArrowIcon from '@/icons/ArrowIcon'

const GetStartedObjectiveButton = ({
  objective,
  setSelectedObjective,
  selectedPlan,
  isDisabled,
}) => {
  const { name, value, plan } = objective

  const classNames = {
    growth: '',
    traffic: 'bg-twitter border-twitter hover:bg-twitter hover:border-twitter hover:bg-opacity-90',
    sales: 'bg-insta border-insta hover:bg-insta hover:border-insta hover:bg-opacity-90',
  }

  return (
    <div className="flex flex-col w-full xs:w-1/3 mx-0 mb-4 xs:mx-4 xs:mb-0">
      <Button
        key={value}
        onClick={() => setSelectedObjective(value)}
        className={['mb-1', classNames[value]].join(' ')}
        trackComponentName="GetStartedObjectiveButton"
        isDisabled={isDisabled}
      >
        {name}
        <ArrowIcon
          className="w-7 h-auto ml-1"
          direction="right"
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
