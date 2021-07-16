import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import Select from '@/elements/Select'

import { getCallToActions } from '@/app/helpers/conversionsHelpers'

const CallToActionSelector = ({
  callToAction,
  setCallToAction,
  className,
  label,
  disabled,
}) => {
  const [callToActionOptions, setCallToActionOptions] = React.useState([])

  // Get all call to actions and convert them to the correct select options object shape
  useAsyncEffect(async (isMounted) => {
    if (!isMounted()) return
    const { res: callToActions } = await getCallToActions()
    const options = callToActions.map(({ id, name }) => ({ name, value: id }))
    setCallToActionOptions(options)
  }, [])

  const handleSelect = React.useCallback((e) => {
    const callToActionOption = callToActionOptions.find(({ value }) => value === e.target.value)
    // Set state in parent component
    setCallToAction(callToActionOption.value)
  }, [callToActionOptions, setCallToAction])

  React.useEffect(() => {
    if (!callToAction) {
      setCallToAction(callToActionOptions[0]?.value)
    }
  }, [callToAction, setCallToAction, callToActionOptions])

  return (
    <div className={className}>
      <Select
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
  callToAction: PropTypes.string,
  setCallToAction: PropTypes.func.isRequired,
  className: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
}

CallToActionSelector.defaultProps = {
  callToAction: '',
  className: '',
  label: '',
  disabled: false,
}

export default CallToActionSelector
