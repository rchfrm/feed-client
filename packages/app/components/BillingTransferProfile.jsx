import React from 'react'

import BillingTransferProfileForm from '@/app/BillingTransferProfileForm'
import copy from '@/app/copy/billingCopy'

import MarkdownText from '@/elements/MarkdownText'

const BillingTransferProfile = () => {
  const [success, setSuccess] = React.useState(false)

  React.useEffect(() => {
    if (!success) return

    const timeout = setTimeout(() => {
      setSuccess(false)
    }, 5000)

    return () => {
      clearTimeout(timeout)
    }
  }, [success])

  return (
    <div>
      <h3 className="font-bold">Manage profiles</h3>
      <MarkdownText markdown={copy.transferDescription} />
      {success ? <MarkdownText markdown="Request sent 🎉" /> : (
        <BillingTransferProfileForm
          className="mt-10"
          setSuccess={setSuccess}
        />
      )}
    </div>
  )
}

BillingTransferProfile.propTypes = {
}

BillingTransferProfile.defaultProps = {

}

export default React.memo(BillingTransferProfile)
