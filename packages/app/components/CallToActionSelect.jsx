import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'
import Select from '@/elements/Select'
import Error from '@/elements/Error'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { getCallToActions } from '@/app/helpers/adDefaultsHelpers'

const CallToActionSelect = ({
  onSelect,
  onSuccess,
  callToAction,
  setCallToAction,
  callToActionId,
  postId,
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
  const { artistId } = React.useContext(ArtistContext)

  useAsyncEffect(async (isMounted) => {
    const { res: callToActions } = await getCallToActions()
    if (! isMounted()) {
      return
    }

    const options = callToActions.map(({ id, name }) => ({ name, value: id }))
    setCallToActionOptions(options)
    setLoading(false)
  }, [])

  const save = React.useCallback(async (selectedOptionValue) => {
    if (loading) {
      return
    }

    setLoading(true)

    if (! shouldSaveOnChange) {
      setCallToAction(selectedOptionValue)
      setLoading(false)
      return
    }

    const { res, error } = await onSelect({
      artistId,
      callToAction: selectedOptionValue,
      hasSalesObjective,
      assetId: postId,
      campaignType,
      callToActionId,
    })


    if (error) {
      setError(error)
      setLoading(false)
      return
    }

    onSuccess(res)
    setError(null)
    setLoading(false)
  }, [setCallToAction, shouldSaveOnChange, artistId, onSelect, onSuccess, postId, campaignType, callToActionId, loading, hasSalesObjective])

  const handleChange = (e) => {
    const { target: { value } } = e

    if (value === callToAction) {
      return
    }

    const selectedOptionValue = callToActionOptions.find((callToActionOption) => callToActionOption.value === value).value
    save(selectedOptionValue)
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
    </div>
  )
}

CallToActionSelect.propTypes = {
  onSelect: PropTypes.func,
  onSuccess: PropTypes.func,
  callToAction: PropTypes.string,
  setCallToAction: PropTypes.func.isRequired,
  callToActionId: PropTypes.string,
  postId: PropTypes.string,
  campaignType: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  shouldSaveOnChange: PropTypes.bool,
  hasSalesObjective: PropTypes.bool,
}

CallToActionSelect.defaultProps = {
  onSelect: () => {},
  onSuccess: () => {},
  callToAction: '',
  callToActionId: '',
  postId: '',
  campaignType: '',
  className: '',
  label: '',
  disabled: false,
  shouldSaveOnChange: false,
  hasSalesObjective: false,
}

export default CallToActionSelect
