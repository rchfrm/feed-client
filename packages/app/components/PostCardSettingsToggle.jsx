import React from 'react'

import ToggleSwitch from '@/elements/ToggleSwitch'

const PostCardSettingsToggle = () => {
  const [currentState, setCurrentState] = React.useState(true)

  const onChange = (newState) => {
    setCurrentState(newState)
  }

  return (
    <ToggleSwitch
      state={currentState}
      onChange={onChange}
    />
  )
}

PostCardSettingsToggle.propTypes = {

}

PostCardSettingsToggle.defaultProps = {

}

export default PostCardSettingsToggle
