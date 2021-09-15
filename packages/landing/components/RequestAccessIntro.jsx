import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'
import ButtonApp from '@/elements/ButtonApp'

import { mixpanelExternalLinkClick } from '@/helpers/mixpanelHelpers'

import copy from '@/copy/requestAccessCopy'

const { signupClosedIntro, signupClosedReferral, signupClosedOutro } = copy


const RequestAccessIntro = ({ className }) => {
  return (
    <div className={className}>
      <MarkdownText markdown={signupClosedIntro} className="mb-4" allowHtml />
      <div className="p-4 bg-grey-1 mb-5 rounded-dialogue">
        <MarkdownText markdown={signupClosedReferral} className="mb-4" allowHtml />
        <ButtonApp
          version="x-small green"
          className="w-64"
          isExternalLink
          onClick={(e) => {
            e.preventDefault()
            mixpanelExternalLinkClick('https://beta.tryfeed.co/join/referral')
          }}
        >
          Sign up with referral code
        </ButtonApp>
      </div>
      <MarkdownText markdown={signupClosedOutro} allowHtml className="mb-6" />
    </div>
  )
}

RequestAccessIntro.propTypes = {
  className: PropTypes.string,
}

RequestAccessIntro.defaultProps = {
  className: null,
}

export default RequestAccessIntro
