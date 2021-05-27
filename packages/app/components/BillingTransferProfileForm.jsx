import React from 'react'
import PropTypes from 'prop-types'

import shallow from 'zustand/shallow'
import Button from '@/elements/Button'
import Error from '@/elements/Error'
import Input from '@/elements/Input'
import Select from '@/elements/Select'

import useBillingStore from '@/app/stores/billingStore'

import * as billingHelpers from '@/app/helpers/billingHelpers'

// READING FROM STORE
const getBillingStoreState = (state) => ({ artists: state.organisationArtists })

// THE FORM
const FORM = ({
  className,
  setSidePanelButton,
  setSidePanelLoading,
  setSuccess,
}) => {
  const [artist, setArtist] = React.useState({})
  const [email, setEmail] = React.useState('')
  const [error, setError] = React.useState(null)

  // READ from BILLING STORE
  const { artists } = useBillingStore(getBillingStoreState, shallow)

  // FORM STATE
  const [isLoading, setIsLoading] = React.useState(false)

  // HANDLE LOADING
  React.useEffect(() => {
    setSidePanelLoading(isLoading)
  }, [isLoading, setSidePanelLoading])


  // HANDLE FORM
  const onSubmit = React.useCallback(async () => {
    if (isLoading) return

    setIsLoading(true)

    // SEND API REQUEST
    const { error: serverError } = await billingHelpers.createTransferRequest(artist.id, email)

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
  }, [isLoading, artist, email, setSuccess])

  // CHANGE SIDEPANEL BUTTON
  React.useEffect(() => {
    const button = <Button version="green" disabled={!artist.name || !email} onClick={onSubmit}>Send</Button>
    setSidePanelButton(button)
  }, [onSubmit, setSidePanelButton, artist, email])

  return (
    <form
      className={[className].join(' ')}
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(e)
      }}
    >
      <Error error={error} />

      {/* PROFILE */}
      <Select
        name="artist"
        handleChange={({ target: { value } }) => {
          const artist = artists.find(({ name }) => name === value)
          setArtist(artist)
        }}
        selectedValue={artist.name}
        options={artists}
        placeholder="Choose profile"
        required
      />

      {/* EMAIL */}
      <Input
        name="email"
        type="email"
        value={email}
        updateValue={setEmail}
        placeholder="Email address"
        required
      />
    </form>
  )
}

const BillingTransferProfileForm = ({
  className,
  setSidePanelButton,
  setSidePanelLoading,
  setSuccess,
}) => {
  return (
    <FORM
      className={className}
      setSidePanelButton={setSidePanelButton}
      setSidePanelLoading={setSidePanelLoading}
      setSuccess={setSuccess}
    />
  )
}

BillingTransferProfileForm.propTypes = {
  className: PropTypes.string,
  setSidePanelButton: PropTypes.func.isRequired,
  setSidePanelLoading: PropTypes.func.isRequired,
  setSuccess: PropTypes.func.isRequired,
}

BillingTransferProfileForm.defaultProps = {
  className: '',
}

export default BillingTransferProfileForm
