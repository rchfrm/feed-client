import React from 'react'
import PropTypes from 'prop-types'

import ReferralCodeShare from '@/app/ReferralCodeShare'
import ReferralCodeProgress from '@/app/ReferralCodeProgress'

const ReferralCodeContent = ({ className }) => {
  return (
    <div
      className={[
        'max-w-lg mx-auto md:max-w-none',
        'md:grid grid-cols-2 gap-20 grid-flow-col-dense',
        className,
      ].join(' ')}
    >
      <ReferralCodeShare className="mb-12 md:mb-0 md:col-span-1 md:col-start-2" />
      <ReferralCodeProgress className="md:col-span-1 md:col-start-1" />
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
