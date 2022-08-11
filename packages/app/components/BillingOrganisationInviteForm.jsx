import React from 'react'
import PropTypes from 'prop-types'

import shallow from 'zustand/shallow'
import Button from '@/elements/Button'
import Error from '@/elements/Error'
import Input from '@/elements/Input'

import useBillingStore from '@/app/stores/billingStore'

import * as billingHelpers from '@/app/helpers/billingHelpers'

// READING FROM STORE
const getBillingStoreState = (state) => ({ organisation: state.organisation })

// THE FORM
const FORM = ({
  className,
  setSuccess,
}) => {
  const [email, setEmail] = React.useState('')
  const [error, setError] = React.useState(null)

  // READ from BILLING STORE
  const { organisation } = useBillingStore(getBillingStoreState, shallow)

  // FORM STATE
  const [isLoading, setIsLoading] = React.useState(false)

  // HANDLE FORM
  const onSubmit = React.useCallback(async () => {
    if (isLoading) return

    setIsLoading(true)

    // SEND API REQUEST
    const { error: serverError } = await billingHelpers.createOrganizationInvite(organisation.id, email)

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
  }, [isLoading, organisation, email, setSuccess])

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
        trackComponentName="BillingOrganisationInviteForm"
        className="w-full"
      >
        Send
      </Button>
    </form>
  )
}

const BillingOrganisationInviteForm = ({
  className,
  setSuccess,
}) => {
  return (
    <FORM
      className={className}
      setSuccess={setSuccess}
    />
  )
}

BillingOrganisationInviteForm.propTypes = {
  className: PropTypes.string,
  setSuccess: PropTypes.func.isRequired,
}

BillingOrganisationInviteForm.defaultProps = {
  className: '',
}

export default BillingOrganisationInviteForm
