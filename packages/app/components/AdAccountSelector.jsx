import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import Select from '@/elements/Select'
import Error from '@/elements/Error'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import { getAdAccounts, updateAdAccount } from '@/app/helpers/artistHelpers'

const AdAccountSelector = ({
  adAccountId,
  setAdAccountId,
  adAccounts,
  onSuccess,
  shouldSaveOnChange,
  disabled,
  label,
  className,
}) => {
  const [adAccountOptions, setAdAccountOptions] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState(null)

  const { artistId } = React.useContext(ArtistContext)

  // Get all ad accounts and convert them to the correct select options object shape
  useAsyncEffect(async (isMounted) => {
    if (!artistId) {
      setIsLoading(false)
      return
    }

    if (adAccounts.length) {
      const options = adAccounts.map(({ id, name }) => ({ name, value: id }))

      setAdAccountOptions(options)
      setIsLoading(false)

      return
    }
    setIsLoading(true)

    const { res, error } = await getAdAccounts(artistId)
    if (!isMounted()) return

    if (error) {
      setError(error?.message?.previous || error)
      setIsLoading(false)
      return
    }
    const { adaccounts } = res
    const options = adaccounts.map(({ id, name }) => ({ name, value: id }))

    setAdAccountOptions(options)
    setIsLoading(false)
  }, [])

  const updateAdAccountId = async (selectedOptionValue) => {
    setIsLoading(true)

    // Skip API request and only update parent call to action value
    if (!shouldSaveOnChange) {
      setAdAccountId(selectedOptionValue)
      setIsLoading(false)
      return
    }

    // Make API request
    const { res, error } = await updateAdAccount(artistId, selectedOptionValue)

    // Handle error
    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }

    // Handle success
    onSuccess(res)
    setError(null)
    setIsLoading(false)
  }

  const handleChange = (e) => {
    const { target: { value } } = e
    if (value === adAccountId) return

    setAdAccountId(value)
    updateAdAccountId(value)
  }

  React.useEffect(() => {
    if (!adAccountId) {
      setAdAccountId(adAccountOptions[0]?.value)
    }
  }, [adAccountId, setAdAccountId, adAccountOptions])

  return (
    <div className={className}>
      {error && (
        <Error error={error} />
      )}
      <Select
        loading={isLoading}
        handleChange={handleChange}
        name="ad_account"
        label={label}
        placeholder="Facebook Ad Account Name"
        selectedValue={adAccountId}
        options={adAccountOptions}
        disabled={disabled}
      />
    </div>
  )
}

AdAccountSelector.propTypes = {
  adAccountId: PropTypes.string,
  setAdAccountId: PropTypes.func.isRequired,
  adAccounts: PropTypes.array,
  onSuccess: PropTypes.func,
  shouldSaveOnChange: PropTypes.bool,
  className: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
}

AdAccountSelector.defaultProps = {
  adAccountId: '',
  adAccounts: [],
  onSuccess: () => {},
  shouldSaveOnChange: false,
  disabled: false,
  label: '',
  className: '',
}

export default AdAccountSelector
