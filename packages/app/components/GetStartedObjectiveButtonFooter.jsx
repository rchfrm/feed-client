import React from 'react'
import PropTypes from 'prop-types'

import useOpenPricingPlanReadMoreSidePanel from '@/app/hooks/useOpenPricingPlanReadMoreSidePanel'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import MarkdownText from '@/elements/MarkdownText'

import InformationIcon from '@/icons/InformationIcon'
import StarIcon from '@/icons/StarIcon'
import InsightsIcon from '@/icons/InsightsIcon'
import LockIcon from '@/icons/LockIcon'

import { pricingPlans } from '@/constants/pricing'
import brandColors from '@/constants/brandColors'

import copy from '@/app/copy/getStartedCopy'

const GetStartedObjectiveButtonFooter = ({
  objective,
  isDisabled,
  isRestricted,
}) => {
  const { artist } = React.useContext(ArtistContext)
  const { currency: artistCurrency } = artist

  const icons = {
    growth: InformationIcon,
    traffic: InsightsIcon,
    sales: StarIcon,
  }
  const Icon = icons[objective]

  const openPricingPlanReadMoreSidePanel = useOpenPricingPlanReadMoreSidePanel()

  const openReadMoreSidePanel = () => {
    const plan = isRestricted ? 'growth' : 'free'
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
        <MarkdownText markdown={copy.objectiveDisabledFooter(isRestricted)} className="mb-0 text-xs mt-[2px]" />
      </div>
    ) : (
      <button
        className="flex justify-center items-center"
        onClick={openReadMoreSidePanel}
      >
        <div className="flex items-center justify-center w-4 h-4 mr-1 rounded-full bg-grey-dark">
          <Icon className="w-3 h-3" fill={brandColors.offwhite} />
        </div>
        <MarkdownText markdown={copy.objectivePlanFooter(isRestricted)} className="mb-0 text-xs text-grey-dark" />
      </button>
    )
  )
}

GetStartedObjectiveButtonFooter.propTypes = {
  objective: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  isRestricted: PropTypes.bool.isRequired,
}

export default GetStartedObjectiveButtonFooter
