import React from 'react'
import PropTypes from 'prop-types'

import CopyTextButton from '@/elements/CopyTextButton'
import MarkdownText from '@/elements/MarkdownText'

import { UserContext } from '@/contexts/UserContext'

import copy from '@/app/copy/referralCodeCopy'

const ReferralCodeWidget = ({ className }) => {
  const { user: { referral_code } } = React.useContext(UserContext)
  return (
    <div
      className={[className].join(' ')}
    >
      <CopyTextButton
        label="Your referral code"
        text={referral_code}
        size="large"
        className="w-full mb-3"
      />
      <MarkdownText
        markdown={copy.explanation}
        className="text-sm"
      />
    </div>
  )
}

ReferralCodeWidget.propTypes = {
  className: PropTypes.string,
}

ReferralCodeWidget.defaultProps = {
  className: null,
}


export default ReferralCodeWidget
