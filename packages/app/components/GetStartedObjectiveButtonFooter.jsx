import React from 'react'
import PropTypes from 'prop-types'

import useOpenPricingPlanReadMoreSidePanel from '@/app/hooks/useOpenPricingPlanReadMoreSidePanel'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import MarkdownText from '@/elements/MarkdownText'

import InformationIcon from '@/icons/InformationIcon'
import StarCircleIcon from '@/icons/StarCircleIcon'
import InsightsCircleIcon from '@/icons/InsightsCircleIcon'
import LockIcon from '@/icons/LockIcon'

import { pricingPlans } from '@/constants/pricing'
import brandColors from '@/constants/brandColors'

import copy from '@/app/copy/getStartedCopy'

const GetStartedObjectiveButtonFooter = ({
  plan,
  isDisabled,
}) => {
  const { artist } = React.useContext(ArtistContext)
  const { currency: artistCurrency } = artist

  const icons = {
    basic: InformationIcon,
    growth: InsightsCircleIcon,
    pro: StarCircleIcon,
  }
  const Icon = icons[plan]

  const openPricingPlanReadMoreSidePanel = useOpenPricingPlanReadMoreSidePanel()

  const openReadMoreSidePanel = () => {
    const pricingPlan = pricingPlans.find(({ name }) => name === plan)

    openPricingPlanReadMoreSidePanel(pricingPlan, artistCurrency || 'GBP')
  }

  return (
    isDisabled ? (
      <div className="flex justify-center items-center">
        <LockIcon
          className="w-3 h-3 mr-1 flex-shrink-0"
          fill={brandColors.instagram.bg}
        />
        <MarkdownText markdown={copy.objectiveDisabledFooter(plan)} className="mb-0 text-xs mt-[2px]" />
      </div>
    ) : (
      <button
        className="flex justify-center items-center"
        onClick={openReadMoreSidePanel}
      >
        <Icon className="w-4 h-4 mr-1" fill={brandColors.greyDark} />
        <MarkdownText markdown={copy.objectivePlanFooter(plan)} className="mb-0 text-xs text-grey-3" />
      </button>
    )
  )
}

GetStartedObjectiveButtonFooter.propTypes = {
  plan: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
}

GetStartedObjectiveButtonFooter.defaultProps = {
}

export default GetStartedObjectiveButtonFooter
