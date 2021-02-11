import React from 'react'
import PropTypes from 'prop-types'

import ToggleSwitch from '@/elements/ToggleSwitch'

import * as postsHelpers from '@/app/helpers/postsHelpers'

import { ArtistContext } from '@/contexts/ArtistContext'

// CALL TO CHANGE STATE
const runChangeState = ({ artistId, postId, promotionEnabled }) => {
  return postsHelpers.updatePost({ artistId, postId, promotionEnabled })
}


const PostToggle = ({
  postId,
  promotionEnabled,
  // promotableStatus,
  togglePromotion,
  disabled,
}) => {
  // Store internal state based on promotionEnabled
  const [currentState, setCurrentState] = React.useState(promotionEnabled)
  // Update internal state when outside state changes
  React.useEffect(() => {
    setCurrentState(promotionEnabled)
  }, [promotionEnabled])

  // SERVER
  const { artistId } = React.useContext(ArtistContext)
  const [isLoading, setIsLoading] = React.useState(false)
  // ON CHANGING THE TOGGLE SWITCH
  const onChange = React.useCallback(async (newState) => {
    // Start loading
    setIsLoading(true)
    // Update state passed to toggle component
    setCurrentState(newState)
    const { res: updatedPost, error } = await runChangeState({ artistId, postId, promotionEnabled: newState })
    setIsLoading(false)
    // Return to previous value if erroring
    if (error) {
      setCurrentState(!newState)
      return
    }
    // Update post list state
    const { promotion_enabled, promotable_status } = updatedPost
    // Update post list state
    togglePromotion(postId, promotion_enabled, promotable_status)
  }, [artistId, postId, togglePromotion])

  return (
    <ToggleSwitch
      state={currentState}
      onChange={onChange}
      isLoading={isLoading}
      disabled={disabled}
    />
  )
}

PostToggle.propTypes = {
  postId: PropTypes.string.isRequired,
  promotionEnabled: PropTypes.bool.isRequired,
  // promotableStatus: PropTypes.number.isRequired,
  togglePromotion: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}

PostToggle.defaultProps = {
  disabled: false,
}


export default PostToggle
