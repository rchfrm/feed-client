import React from 'react'
import PropTypes from 'prop-types'

import RadioButtons from '@/elements/RadioButtons'

import useAlertModal from '@/hooks/useAlertModal'
import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import { setLinkTrackingOption } from '@/app/helpers/postsHelpers'

const utmStatusToString = (utmOn) => {
  if (utmOn) return 'yes'
  return 'no'
}

const utmStatusToBoolean = (useUtm) => {
  return useUtm === 'yes'
}

const PostsSettingsLinkTracking = ({ utmOn }) => {
  // Side panel context
  const { setSidePanelLoading } = React.useContext(SidePanelContext)
  // Handle alert
  const { showAlert, closeAlert } = useAlertModal()
  // Handle state
  const initialValue = React.useRef(utmStatusToString(utmOn))
  const [useUtm, setUseUtm] = React.useState(initialValue.current)
  const options = [
    {
      value: 'yes',
      label: 'Yes',
    },
    {
      value: 'no',
      label: 'No',
    },
  ]
  // SET NEW STATE
  const setState = React.useCallback(async (state) => {
    setSidePanelLoading(true)
    const { res, error } = await setLinkTrackingOption(state)
    const useUtm = utmStatusToString(res)
    initialValue.current = useUtm
    setUseUtm(useUtm)
    setSidePanelLoading(false)
  }, [setSidePanelLoading])
  // SHOW ALERT
  const onChange = React.useCallback((value) => {
    // Show confirmation alert
    if (value === initialValue.current) return
    const booleanValue = utmStatusToBoolean(value)
    const copy = 'Are you sure?'
    const buttons = [
      {
        text: 'Ok',
        onClick: () => {
          setState(booleanValue)
        },
        color: 'green',
      },
      {
        text: 'Cancel',
        onClick: closeAlert,
        color: 'black',
      },
    ]
    showAlert({ copy, buttons })
  }, [closeAlert, showAlert, setState])

  return (
    <div>
      <RadioButtons
        className="settingSection__options"
        options={options}
        onChange={onChange}
        selectedValue={useUtm}
      />
    </div>
  )
}

PostsSettingsLinkTracking.propTypes = {
  utmOn: PropTypes.bool.isRequired,
}

export default PostsSettingsLinkTracking
