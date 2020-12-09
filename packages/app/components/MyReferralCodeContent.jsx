import React from 'react'
import PropTypes from 'prop-types'

import ShareButton from '@/elements/ShareButton'

import ReferralCodeWidget from '@/app/ReferralCodeWidget'


const MyReferralCodeContent = ({ className }) => {
  const url = 'https://test.com'
  const title = 'Get Feed'
  const text = 'Sign up to Feed'

  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <ReferralCodeWidget />
      <div>
        <ShareButton
          url={url}
          title={title}
          text={text}
          className={[
            'w-full',
          ].join(' ')}
        />
      </div>
    </div>
  )
}

MyReferralCodeContent.propTypes = {
  className: PropTypes.string,
}

MyReferralCodeContent.defaultProps = {
  className: null,
}

export default MyReferralCodeContent
