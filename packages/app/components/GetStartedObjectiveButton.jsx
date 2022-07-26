import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'

import ArrowAltIcon from '@/icons/ArrowAltIcon'
import InformationIcon from '@/icons/InformationIcon'
import StarCircleIcon from '@/icons/StarCircleIcon'
import InsightsCircleIcon from '@/icons/InsightsCircleIcon'

import brandColors from '@/constants/brandColors'
import copy from '@/app/copy/getStartedCopy'

const GetStartedObjectiveButton = ({ objective, setSelectedObjective, isDisabled }) => {
  const { name, value, color, plan } = objective

  const icons = {
    basic: InformationIcon,
    growth: InsightsCircleIcon,
    pro: StarCircleIcon,
  }
  const Icon = icons[plan]

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
      <div className="flex justify-center items-center">
        <Icon className="w-4 h-4 mr-1" fill={brandColors.greyDark} />
        <MarkdownText markdown={copy.objectivePlanFooter(plan)} className="mb-0 text-xs text-grey-3" />
      </div>
    </div>
  )
}

GetStartedObjectiveButton.propTypes = {
  objective: PropTypes.object.isRequired,
  setSelectedObjective: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
}

GetStartedObjectiveButton.defaultProps = {
  isDisabled: false,
}

export default GetStartedObjectiveButton
