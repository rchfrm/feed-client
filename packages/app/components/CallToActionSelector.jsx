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
    const selectedCallToAction = options.find(cta => cta.value === currentCallToAction)
    setCallToActionOptions(options)
    setCallToAction(selectedCallToAction || options[0])
  }, [])

  const handleSelect = React.useCallback((e) => {
    const callToActionOption = callToActionOptions.find(({ value }) => value === e.target.value)
    // Set state in parent component
    setCallToAction(callToActionOption)
  }, [callToActionOptions, setCallToAction])

  return (
    <div className={className}>
      <Select
        handleChange={handleSelect}
        name="call_to_Action"
        label="Call to Action"
        selectedValue={callToAction?.value}
        options={callToActionOptions}
      />
    </div>
  )
}

CallToActionSelector.propTypes = {
  callToAction: PropTypes.object,
  setCallToAction: PropTypes.func.isRequired,
  className: PropTypes.string,
}

CallToActionSelector.defaultProps = {
  callToAction: null,
  className: '',
}

export default CallToActionSelector
