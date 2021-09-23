import React from 'react'

import { UserContext } from '@/app/contexts/UserContext'

import ButtonShare from '@/elements/ButtonShare'

const BillingCopyReferralsCode = () => {
  const { user: { referral_code } } = React.useContext(UserContext)
  const baseUrl = !process.env.isDev ? 'https://localhost:3001' : 'https://app.tryfeed.co'
  const joinUrl = `${baseUrl}/join?code=${referral_code}`
  const copyText = joinUrl.replace(/^https?:\/\//, '')
  return (
    <ButtonShare
      url={joinUrl}
      copyText={copyText}
      className="w-full"
      useCopyFallback
    />
  )
}

BillingCopyReferralsCode.propTypes = {
}

export default BillingCopyReferralsCode
