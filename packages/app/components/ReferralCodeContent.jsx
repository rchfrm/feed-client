import React from 'react'
import PropTypes from 'prop-types'

import ReferralCodeShare from '@/app/ReferralCodeShare'

const ReferralCodeContent = ({ className }) => {
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <ReferralCodeShare className="max-w-lg mx-auto" />
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
