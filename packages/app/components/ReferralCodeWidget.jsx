import React from 'react'
import PropTypes from 'prop-types'

import CopyTextButton from '@/elements/CopyTextButton'
import MarkdownText from '@/elements/MarkdownText'

import { UserContext } from '@/contexts/UserContext'

import copy from '@/app/copy/referralCodeCopy'

const ReferralCodeWidget = ({
  label,
  useSmallText,
  className,
}) => {
  const { user: { referral_code } } = React.useContext(UserContext)
  return (
    <div
      className={[className].join(' ')}
    >
      <CopyTextButton
        text={referral_code}
        label={label}
        size="large"
        className={[
          'w-full',
          useSmallText ? 'mb-3' : 'mb-5',
        ].join(' ')}
      />
      <MarkdownText
        markdown={copy.explanation}
        className={useSmallText ? 'text-sm' : null}
      />
    </div>
  )
}

ReferralCodeWidget.propTypes = {
  label: PropTypes.string,
  useSmallText: PropTypes.bool,
  className: PropTypes.string,
}

ReferralCodeWidget.defaultProps = {
  label: '',
  useSmallText: false,
  className: null,
}


export default ReferralCodeWidget
