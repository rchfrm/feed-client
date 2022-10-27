import React from 'react'
import PropTypes from 'prop-types'
import Button from '@/elements/Button'
import Error from '@/elements/Error'
import Input from '@/elements/Input'
import * as billingHelpers from '@/app/helpers/billingHelpers'

// THE FORM
const FORM = ({
  className,
  selectedOrgId,
  setSuccess,
}) => {
  const [email, setEmail] = React.useState('')
  const [error, setError] = React.useState(null)

  // FORM STATE
  const [isLoading, setIsLoading] = React.useState(false)

  // HANDLE FORM
  const onSubmit = React.useCallback(async () => {
    if (isLoading) return

    setIsLoading(true)

    // SEND API REQUEST
    const { error: serverError } = await billingHelpers.createOrganizationInvite(selectedOrgId, email)

    // HANDLE ERROR
    if (serverError) {
      setError(serverError)
      setIsLoading(false)
      return
    }

    // HANDLE SUCCESS
    setIsLoading(false)
    setError(null)
    setSuccess(true)
  }, [isLoading, selectedOrgId, email, setSuccess])

  return (
    <form
      className={[className].join(' ')}
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(e)
      }}
    >
      <Error error={error} />
      <Input
        name="email"
        type="email"
        value={email}
        updateValue={setEmail}
        placeholder="Email address"
        required
      />
      <Button
        version="black"
        disabled={!email}
        onClick={onSubmit}
        loading={isLoading}
        trackComponentName="BillingOrganizationInviteForm"
        className="w-full"
      >
        Send
      </Button>
    </form>
  )
}

const BillingOrganizationInviteForm = ({
  className,
  selectedOrgId,
  setSuccess,
}) => {
  return (
    <FORM
      className={className}
      selectedOrgId={selectedOrgId}
      setSuccess={setSuccess}
    />
  )
}

BillingOrganizationInviteForm.propTypes = {
  className: PropTypes.string,
  selectedOrgId: PropTypes.string.isRequired,
  setSuccess: PropTypes.func.isRequired,
}

BillingOrganizationInviteForm.defaultProps = {
  className: '',
}

export default BillingOrganizationInviteForm
