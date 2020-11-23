import React from 'react'
import PropTypes from 'prop-types'

const PostToggleSwitch = ({
  action,
  setButtonState,
  setChangeState,
}) => {
  const xClass = action === 'off' ? 'left-0' : 'right-0'
  const newState = React.useMemo(() => {
    return action
  }, [action])
  const onClick = React.useCallback(() => {
    setButtonState(newState)
    setChangeState(true)
  }, [newState, setButtonState, setChangeState])
  return (
    <button
      className={[
        'absolute',
        'top-0',
        'bottom-0',
        xClass,
        'w-1/2',
        'z-2',
      ].join(' ')}
      onClick={onClick}
      aria-label={`Toggle post ${action}`}
    />
  )
}

PostToggleSwitch.propTypes = {
  action: PropTypes.string.isRequired,
  setButtonState: PropTypes.func.isRequired,
  setChangeState: PropTypes.func.isRequired,
}

export default PostToggleSwitch
