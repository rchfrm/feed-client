import React from 'react'
import PropTypes from 'prop-types'

import RadioButtons from '@/elements/RadioButtons'

const utmStatusToString = (utmOn) => {
  if (utmOn) return 'yes'
  return 'no'
}

const PostsSettingsLinkTracking = ({ utmOn }) => {
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
  const onChange = React.useCallback((value) => {
    console.log('value', value)
  }, [])

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
