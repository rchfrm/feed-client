import React from 'react'

import useOpenPricingPlanUpgradeSidePanel from '@/app/hooks/useOpenPricingPlanUpgradeSidePanel'

import ArrowAltIcon from '@/icons/ArrowAltIcon'

const ProfileStatusUpgradePlan = () => {
  const openPricingPlanUpgradeSidePanel = useOpenPricingPlanUpgradeSidePanel()

  const openPricingUpgradeSidePanel = () => {
    openPricingPlanUpgradeSidePanel('set-budget')
  }

  return (
    <button
      onClick={openPricingUpgradeSidePanel}
    >
      <span
        className={[
          'mb-0',
          'border-3',
          'border-green',
          'border-solid',
          'rounded-full',
          'inline-flex',
          'items-center',
          'ml-2',
          'py-2',
          'px-3',
        ].join(' ')}
      >
        Upgrade to <span className="ml-1 font-bold text-insta">Growth</span>
        <ArrowAltIcon direction="right" className="ml-2" />
      </span>
    </button>
  )
}

ProfileStatusUpgradePlan.propTypes = {
}

ProfileStatusUpgradePlan.defaultProps = {
}

export default ProfileStatusUpgradePlan
