import React from 'react'
import PropTypes from 'prop-types'
import Button from '@/elements/Button'
import Error from '@/elements/Error'
import Input from '@/elements/Input'
import Select from '@/elements/Select'
import { createTransferRequest } from '@/app/helpers/billingHelpers'

// THE FORM
const FORM = ({
  className,
  setSuccess,
  organizationArtists,
}) => {
  const [artist, setArtist] = React.useState({})
  const [options, setOptions] = React.useState([])
  const [email, setEmail] = React.useState('')
  const [error, setError] = React.useState(null)

  // FORM STATE
  const [isLoading, setIsLoading] = React.useState(false)

  // HANDLE FORM
  const onSubmit = React.useCallback(async () => {
    if (isLoading) return

    setIsLoading(true)

    // SEND API REQUEST
    const { error: serverError } = await createTransferRequest(artist.id, email)

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

  React.useEffect(() => {
    const options = organizationArtists.map(({ name, id }) => ({
      name,
      value: id,
    }))

    setOptions(options)
  }, [organizationArtists])

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
          const artist = organizationArtists.find(({ id }) => id === value)
          setArtist(artist)
        }}
        selectedValue={artist.id}
        options={options}
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
      <Button
        version="black"
        disabled={!artist.name || !email}
        onClick={onSubmit}
        loading={isLoading}
        trackComponentName="BillingTransferProfileForm"
        className="w-full"
      >
        Send
      </Button>
    </form>
  )
}

const BillingTransferProfileForm = ({
  className,
  setSuccess,
  organizationArtists,
}) => {
  return (
    <FORM
      className={className}
      setSuccess={setSuccess}
      organizationArtists={organizationArtists}
    />
  )
}

BillingTransferProfileForm.propTypes = {
  className: PropTypes.string,
  setSuccess: PropTypes.func.isRequired,
  organizationArtists: PropTypes.array.isRequired,
}

BillingTransferProfileForm.defaultProps = {
  className: '',
}

export default BillingTransferProfileForm
