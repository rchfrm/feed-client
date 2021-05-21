import React from 'react'
import PropTypes from 'prop-types'

import { UserContext } from '@/app/contexts/UserContext'

import ReferralCodeShare from '@/app/ReferralCodeShare'
import ReferralCodeProgress from '@/app/ReferralCodeProgress'

const ReferralCodeContent = ({ className }) => {
  const { user: {
    referrals_number: totalReferrals,
    qualifying_referrals_number: totalCompleteReferrals,
  } } = React.useContext(UserContext)
  return (
    <div
      className={[
        'max-w-lg lg:max-w-none self-start',
        'lg:grid grid-cols-2 gap-20 grid-flow-col-dense',
        className,
      ].join(' ')}
    >
      <ReferralCodeShare className="mb-12 lg:mb-0 lg:col-span-1 lg:col-start-2" />
      <ReferralCodeProgress
        totalReferrals={totalReferrals}
        totalCompleteReferrals={totalCompleteReferrals}
        className="lg:col-span-1 lg:col-start-1"
      />
    </div>
  )
}

ReferralCodeContent.propTypes = {
  className: PropTypes.string,
}

ReferralCodeContent.defaultProps = {
  className: null,
}

export default ReferralCodeContent