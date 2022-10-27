import React from 'react'
import BillingTransferProfileForm from '@/app/BillingTransferProfileForm'
import copy from '@/app/copy/billingCopy'
import MarkdownText from '@/elements/MarkdownText'
import PropTypes from 'prop-types'

const BillingTransferProfile = ({
  organizationArtists,
}) => {
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
          className="w-full lg:w-2/3 mt-10"
          organizationArtists={organizationArtists}
          setSuccess={setSuccess}
        />
      )}
    </div>
  )
}

BillingTransferProfile.propTypes = {
  organizationArtists: PropTypes.array.isRequired,
}

export default React.memo(BillingTransferProfile)
