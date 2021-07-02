import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import Select from '@/elements/Select'

import { getCallToActions } from '@/app/helpers/conversionsHelpers'

import useControlsStore from '@/app/stores/controlsStore'

const getCallToAction = state => state.conversionsPreferences.callToAction

const CallToActionSelector = ({
  callToAction,
  setCallToAction,
  className,
}) => {
  const currentCallToAction = useControlsStore(getCallToAction)
  const [callToActionOptions, setCallToActionOptions] = React.useState([])

  // Get all call to actions and convert them to the correct select options object shape
  useAsyncEffect(async () => {
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
    setCallToAction(currentCallToAction || callToActionOptions[0]?.value)
  }, [currentCallToAction, setCallToAction, callToActionOptions])

  return (
    <div className={className}>
      <Select
        handleChange={handleSelect}
        name="call_to_Action"
        label="Call to Action"
        selectedValue={callToAction}
        options={callToActionOptions}
      />
    </div>
  )
}

CallToActionSelector.propTypes = {
  callToAction: PropTypes.string,
  setCallToAction: PropTypes.func.isRequired,
  className: PropTypes.string,
}

CallToActionSelector.defaultProps = {
  callToAction: '',
  className: '',
}

export default CallToActionSelector
