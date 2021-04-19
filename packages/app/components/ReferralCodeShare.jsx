import React from 'react'
import PropTypes from 'prop-types'

import ButtonShare from '@/elements/ButtonShare'
import MarkdownText from '@/elements/MarkdownText'

import { UserContext } from '@/app/contexts/UserContext'

import ReferralCodeWidget from '@/app/ReferralCodeWidget'

import copy from '@/app/copy/referralCodeCopy'
import { track } from '@/app/helpers/trackingHelpers'

const ReferralCodeShare = ({
  className,
}) => {
  const { user: { referral_code } } = React.useContext(UserContext)
  const baseUrl = process.env.isDev ? 'https://localhost:3001' : 'https://beta.tryfeed.co'
  const joinUrl = `${baseUrl}/join?code=${referral_code}`
  const title = 'Get Feed'
  const text = 'Sign up to Feed'
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <ReferralCodeWidget className="mb-5" />
      <MarkdownText markdown={copy.sharingLinkExplanation} />
      <div>
        <ButtonShare
          url={joinUrl}
          title={title}
          text={text}
          onShare={(shareType) => {
            track('share_referral_code', {
              shareType: shareType === 'copy' ? 'clipboard' : 'web-share',
            })
          }}
          className={[
            'w-full xs:w-48',
          ].join(' ')}
        />
      </div>
    </div>
  )
}

ReferralCodeShare.propTypes = {
  className: PropTypes.string,
}

ReferralCodeShare.defaultProps = {
  className: null,
}

export default ReferralCodeShare
