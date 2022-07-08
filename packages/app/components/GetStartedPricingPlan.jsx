import React from 'react'
import PropTypes from 'prop-types'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import GetStartedPricingPlanMonthlyCost from '@/app/GetStartedPricingPlanMonthlyCost'
import GetStartedPricingPlanServiceFee from '@/app/GetStartedPricingPlanServiceFee'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'
import ArrowAltIcon from '@/icons/ArrowAltIcon'
import PlusCircleIcon from '@/icons/PlusCircleIcon'
import StarCircleIcon from '@/icons/StarCircleIcon'
import InsightsCircleIcon from '@/icons/InsightsCircleIcon'
import LightbulbIcon from '@/icons/LightbulbIcon'

import { capitalise } from '@/helpers/utils'
import brandColors from '@/constants/brandColors'

const GetStartedPricingPlan = ({
  plan,
  showAnnualPricing,
  setSelectedPricingPlan,
  handleSidePanel,
  currency,
  isRecommended,
}) => {
  const {
    name,
    description,
    monthlyCost,
    serviceFeePercentage,
  } = plan

  const title = capitalise(name)
  const icons = {
    basic: PlusCircleIcon,
    growth: InsightsCircleIcon,
    pro: StarCircleIcon,
  }

  const Icon = icons[name]
  const isDesktop = useBreakpointTest('sm')

  return (
    <div
      className={[
        'w-full sm:h-full relative',
        'flex flex-row items-center justify-between sm:block',
        'py-2 px-3 xs:py-3 sm:p-6',
        'mb-6 sm:mb-0',
        !isDesktop && isRecommended ? 'pb-12 xs:pb-12' : null,
        'border-solid rounded-dialogue',
        isRecommended ? 'border-[5px] border-insta' : 'border-3 border-black',
      ].join(' ')}
    >
      {isRecommended && (
        <div className={[
          'absolute left-0',
          isDesktop ? 'left-0 -top-9' : 'bottom-0 right-0',
          'flex items-center justify-center',
          'w-full h-8 p-3',
          'outline outline-[5px] outline-solid outline-insta',
          'rounded-b-dialogue sm:rounded-t-dialogue sm:rounded-b-none bg-insta',
          'text-xs text-white italic',
        ].join(' ')}
        >
          <LightbulbIcon className="h-4 w-4 mr-1" fill={brandColors.white} />
          Recommended based on your settings
        </div>
      )}
      <h2 className="mb-0 sm:mb-5 text-2xl sm:text-3xl">{capitalise(name)}</h2>
      <MarkdownText
        markdown={description}
        className={[
          'hidden sm:block',
          'small--p',
          'sm:text-base',
          'xxs:min-h-2-lines',
          'xxs:mb-0',
          'xs:min-h-fit',
          'xs:mb-5',
          'sm:min-h-4-lines',
          'sm:mb-0',
          'md:min-h-3-lines',
          'xl:min-h-fit',
          'lg:mb-5',
        ].join(' ')}
      />
      <div className="flex flex-row sm:flex-col">
        <GetStartedPricingPlanMonthlyCost
          amount={monthlyCost[currency]}
          showAnnualPricing={showAnnualPricing}
          currency={currency}
        />
        <GetStartedPricingPlanServiceFee
          percentage={serviceFeePercentage}
          plan={plan}
        />
      </div>
      <button
        className={[
          'sm:w-full flex justify-between',
          'px-0 sm:px-4 py-2 sm:mb-5',
          'sm:border-2 sm:border-green sm:border-solid sm:rounded-dialogue',
          'font-bold',
        ].join(' ')}
        onClick={() => setSelectedPricingPlan(name)}
      >
        <span className="hidden sm:block">Select {title}</span>
        <ArrowAltIcon
          direction="right"
          className="w-6 h-6 sm:w-auto sm:h-auto"
        />
      </button>
      <div className={[
        'absolute -bottom-6 sm:bottom-auto sm:relative',
        'transform -translate-x-1/2 left-1/2',
        'flex items-center font-normal',
        'whitespace-nowrap sm:whitespace-normal',
        'text-xs sm:text-base',
      ].join(' ')}
      >
        <Icon className="w-4 h-4 inline-block mr-1" />
        <div>
          <Button
            version="text"
            onClick={() => handleSidePanel(plan)}
            className="h-4 inline-block mr-1"
            trackComponentName="GetStartedPricingPlan"
          >
            Read more
          </Button>
          about the {title} tier
        </div>
      </div>
    </div>
  )
}

GetStartedPricingPlan.propTypes = {
  plan: PropTypes.object.isRequired,
  showAnnualPricing: PropTypes.bool.isRequired,
  setSelectedPricingPlan: PropTypes.func.isRequired,
  handleSidePanel: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
  isRecommended: PropTypes.bool.isRequired,
}

GetStartedPricingPlan.defaultProps = {
}

export default GetStartedPricingPlan
