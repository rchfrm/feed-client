import React from 'react'
import PropTypes from 'prop-types'

import CopyTextButton from '@/elements/CopyTextButton'
import MarkdownText from '@/elements/MarkdownText'

import { UserContext } from '@/contexts/UserContext'

import copy from '@/app/copy/referralCodeCopy'
import { track } from '@/app/helpers/trackingHelpers'

const ReferralCodeWidget = ({
  label,
  useSmallText,
  putTextAfter,
  className,
}) => {
  const { user: { referral_code } } = React.useContext(UserContext)
  return (
    <div
      className={[className].join(' ')}
    >
      {!putTextAfter && (
        <MarkdownText
          markdown={copy.explanation}
          className={useSmallText ? 'text-sm' : null}
        />
      )}
      <CopyTextButton
        text={referral_code}
        label={label}
        size="large"
        onCopied={() => {
          track('share_referral_code', {
            shareType: 'clipboard',
          })
        }}
        className={[
          'w-full',
        ].join(' ')}
      />
      {putTextAfter && (
        <MarkdownText
          markdown={copy.explanation}
          className={[
            useSmallText ? 'mt-3' : 'mt-5',
            useSmallText ? 'text-sm' : null,
          ].join(' ')}
        />
      )}
    </div>
  )
}

ReferralCodeWidget.propTypes = {
  label: PropTypes.string,
  useSmallText: PropTypes.bool,
  putTextAfter: PropTypes.bool,
  className: PropTypes.string,
}

ReferralCodeWidget.defaultProps = {
  label: '',
  useSmallText: false,
  putTextAfter: false,
  className: null,
}


export default ReferralCodeWidget
