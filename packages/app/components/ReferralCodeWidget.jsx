import React from 'react'
import PropTypes from 'prop-types'
import CopyTextButton from '@/elements/CopyTextButton'
import { UserContext } from '@/app/contexts/UserContext'
import { track } from '@/helpers/trackingHelpers'

const ReferralCodeWidget = ({
  label,
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
        onCopied={() => {
          track('share_referral_code', {
            shareType: 'clipboard',
          })
        }}
        className={[
          'w-full',
        ].join(' ')}
      />
    </div>
  )
}

ReferralCodeWidget.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
}

ReferralCodeWidget.defaultProps = {
  label: '',
  className: null,
}


export default ReferralCodeWidget
