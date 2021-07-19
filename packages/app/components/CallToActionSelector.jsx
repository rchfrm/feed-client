import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import Select from '@/elements/Select'
import Error from '@/elements/Error'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import { getCallToActions } from '@/app/helpers/adDefaultsHelpers'

const CallToActionSelector = ({
  onSelect,
  onSuccess,
  callToAction,
  setCallToAction,
  postId,
  campaignType,
  className,
  label,
  disabled,
  shouldSaveOnChange,
}) => {
  const [callToActionOptions, setCallToActionOptions] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const { artistId } = React.useContext(ArtistContext)

  // Get all call to actions and convert them to the correct select options object shape
  useAsyncEffect(async (isMounted) => {
    if (!isMounted()) return
    const { res: callToActions } = await getCallToActions()
    const options = callToActions.map(({ id, name }) => ({ name, value: id }))
    setCallToActionOptions(options)
    setLoading(false)
  }, [])

  const handleSelect = React.useCallback(async (e) => {
    const selectedOptionValue = callToActionOptions.find(({ value }) => value === e.target.value).value
    // Skip API request and only update parent call to action value
    if (!shouldSaveOnChange) {
      setCallToAction(selectedOptionValue)
      return
    }
    setLoading(true)
    // Make API request
    const { res: { preferences }, error } = await onSelect(artistId, selectedOptionValue, postId, campaignType)
    // Handle error
    if (error) {
      setError(error)
      return
    }
    // Handle success
    onSuccess(preferences.posts.call_to_action)
    setError(null)
    setLoading(false)
  }, [callToActionOptions, setCallToAction, shouldSaveOnChange, artistId, onSelect, onSuccess, postId, campaignType])

  React.useEffect(() => {
    if (!callToAction) {
      setCallToAction(callToActionOptions[0]?.value)
    }
  }, [callToAction, setCallToAction, callToActionOptions])

  return (
    <div className={className}>
      {error && (
        <Error error={error} />
      )}
      <Select
        loading={loading}
        handleChange={handleSelect}
        name="call_to_Action"
        label={label}
        selectedValue={callToAction}
        options={callToActionOptions}
        disabled={disabled}
      />
    </div>
  )
}

CallToActionSelector.propTypes = {
  onSelect: PropTypes.func,
  onSuccess: PropTypes.func,
  callToAction: PropTypes.string,
  setCallToAction: PropTypes.func.isRequired,
  postId: PropTypes.string,
  campaignType: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  shouldSaveOnChange: PropTypes.bool,
}

CallToActionSelector.defaultProps = {
  onSelect: () => {},
  onSuccess: () => {},
  callToAction: '',
  postId: '',
  campaignType: '',
  className: '',
  label: '',
  disabled: false,
  shouldSaveOnChange: false,
}

export default CallToActionSelector
