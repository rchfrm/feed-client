import React from 'react'
import PropTypes from 'prop-types'

import ButtonShare from '@/elements/ButtonShare'
import MarkdownText from '@/elements/MarkdownText'

import { UserContext } from '@/app/contexts/UserContext'

import copy from '@/app/copy/referralCodeCopy'
import { track } from '@/helpers/trackingHelpers'

const ReferralCodeShare = ({
  currencyCode,
  className,
}) => {
  const { user: { referral_code } } = React.useContext(UserContext)
  const baseUrl = process.env.isDev ? 'https://localhost:3001' : 'https://app.tryfeed.co'
  const joinUrl = `${baseUrl}/join?code=${referral_code}`
  const title = 'Get Feed'
  const text = 'Sign up to Feed'
  const copyText = joinUrl.replace(/^https?:\/\//, '')

  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <MarkdownText markdown={copy.sharingLinkExplanation(currencyCode)} />
      <div>
        <ButtonShare
          url={joinUrl}
          title={title}
          text={text}
          copyText={copyText}
          version="pink"
          onShare={(shareType) => {
            track('share_referral_code', {
              shareType: shareType === 'copy' ? 'clipboard' : 'web-share',
            })
          }}
          className={[
            'w-full xs:w-3/4 ',
          ].join(' ')}
          trackComponentName="ReferralCodeShare"
        />
      </div>
    </div>
  )
}

ReferralCodeShare.propTypes = {
  currencyCode: PropTypes.string.isRequired,
  className: PropTypes.string,
}

ReferralCodeShare.defaultProps = {
  className: null,
}

export default ReferralCodeShare
