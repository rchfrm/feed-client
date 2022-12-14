import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import Select from '@/elements/Select'
import Error from '@/elements/Error'

import PostEditAlert from '@/app/PostEditAlert'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import { getCallToActions } from '@/app/helpers/adDefaultsHelpers'

const CallToActionSelector = ({
  onSelect,
  onSuccess,
  callToAction,
  setCallToAction,
  callToActionId,
  postId,
  isPostActive,
  campaignType,
  className,
  label,
  disabled,
  shouldSaveOnChange,
  hasSalesObjective,
}) => {
  const [callToActionOptions, setCallToActionOptions] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [showAlert, setShowAlert] = React.useState(false)
  const [onAlertConfirm, setOnAlertConfirm] = React.useState(() => () => {})
  const { artistId } = React.useContext(ArtistContext)
  const [selectedOptionValue, setSelectedOptionValue] = React.useState(callToAction)

  // Get all call to actions and convert them to the correct select options object shape
  useAsyncEffect(async (isMounted) => {
    if (! isMounted()) return
    const { res: callToActions } = await getCallToActions()
    const options = callToActions.map(({ id, name }) => ({ name, value: id }))
    setCallToActionOptions(options)
    setLoading(false)
  }, [])

  const updateCallToAction = React.useCallback(async (selectedOptionValue, forceRun = false) => {
    if (loading && ! forceRun) return
    setLoading(true)

    if (isPostActive && ! forceRun) {
      // Set function to run when confirming alert
      setOnAlertConfirm(() => () => updateCallToAction(selectedOptionValue, true))
      // Show alert
      setShowAlert(true)
      return
    }
    // Skip API request and only update parent call to action value
    if (! shouldSaveOnChange) {
      setCallToAction(selectedOptionValue)
      setLoading(false)
      return
    }
    // Make API request
    const { res, error } = await onSelect({
      artistId,
      callToAction: selectedOptionValue,
      hasSalesObjective,
      assetId: postId,
      campaignType,
      callToActionId,
    })

    setShowAlert(false)
    // Handle error
    if (error) {
      setError(error)
      setLoading(false)
      return
    }
    // Handle success
    onSuccess(res)
    setError(null)
    setLoading(false)
  }, [setCallToAction, shouldSaveOnChange, artistId, onSelect, onSuccess, postId, campaignType, callToActionId, isPostActive, loading, hasSalesObjective])

  const handleChange = (e) => {
    const { target: { value } } = e
    // Do nothing if value is current value
    if (value === callToAction) return
    const selectedOptionValue = callToActionOptions.find((callToActionOption) => callToActionOption.value === value).value
    setSelectedOptionValue(selectedOptionValue)
    updateCallToAction(selectedOptionValue)
  }

  React.useEffect(() => {
    if (! callToAction) {
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
        handleChange={handleChange}
        name="call_to_action"
        label={label}
        selectedValue={callToAction}
        options={callToActionOptions}
        disabled={disabled}
      />
      {/* ALERT */}
      {showAlert && (
        <PostEditAlert
          type="call to action"
          postId={postId}
          show={showAlert}
          newValue={selectedOptionValue}
          originalValue={callToAction}
          onAlertConfirm={onAlertConfirm}
          onCancel={() => {
            setLoading(false)
            setShowAlert(false)
            setSelectedOptionValue(callToAction)
          }}
        />
      )}
    </div>
  )
}

CallToActionSelector.propTypes = {
  onSelect: PropTypes.func,
  onSuccess: PropTypes.func,
  callToAction: PropTypes.string,
  setCallToAction: PropTypes.func.isRequired,
  callToActionId: PropTypes.string,
  postId: PropTypes.string,
  isPostActive: PropTypes.bool,
  campaignType: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  shouldSaveOnChange: PropTypes.bool,
  hasSalesObjective: PropTypes.bool,
}

CallToActionSelector.defaultProps = {
  onSelect: () => {},
  onSuccess: () => {},
  callToAction: '',
  callToActionId: '',
  postId: '',
  isPostActive: false,
  campaignType: '',
  className: '',
  label: '',
  disabled: false,
  shouldSaveOnChange: false,
  hasSalesObjective: false,
}

export default CallToActionSelector
