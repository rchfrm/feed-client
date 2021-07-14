import React from 'react'
import PropTypes from 'prop-types'

import PostCardLabel from '@/app/PostCardLabel'

import ToggleSwitch from '@/elements/ToggleSwitch'
import PostCardToggleTeaser from '@/app/PostCardToggleTeaser'

import useShowConversionsInterest from '@/app/hooks/useShowConversionsInterest'

import * as postsHelpers from '@/app/helpers/postsHelpers'

import brandColors from '@/constants/brandColors'

// CALL TO CHANGE STATE
const runChangeState = ({ artistId, postId, promotionEnabled, audienceSlug }) => {
  return postsHelpers.updatePost({ artistId, postId, promotionEnabled, audienceSlug })
}

// LABEL GRADIENTS
const createGradient = (color) => `linear-gradient(135deg, ${color} 0%, ${brandColors.yellow} 100%)`
const growthGradient = createGradient(brandColors.blue)
const earnGradient = createGradient(brandColors.red)

const PostCardToggle = ({
  audienceSlug,
  postId,
  artistId,
  isEnabled,
  togglePostState,
  isActive,
  disabled,
  isFeatureEnabled,
  className,
}) => {
  // Store INTERNAL STATE based on promotionEnabled
  const [currentState, setCurrentState] = React.useState(isEnabled)
  // Update internal state when outside state changes
  React.useEffect(() => {
    setCurrentState(isEnabled)
  }, [isEnabled])

  // UPDATE ON SERVER
  const [isLoading, setIsLoading] = React.useState(false)
  // ON CHANGING THE TOGGLE SWITCH
  const onChange = React.useCallback(async (newState) => {
    // Start loading
    setIsLoading(true)
    // Update state passed to toggle component
    setCurrentState(newState)
    const { res: updatedPost, error } = await runChangeState({ artistId, postId, promotionEnabled: newState, audienceSlug })
    setIsLoading(false)
    // Return to previous value if erroring
    if (error) {
      setCurrentState(!newState)
      return
    }
    // Update post list state
    const { promotion_enabled, promotable_status } = updatedPost
    // Update post list state
    togglePostState(postId, promotion_enabled, promotable_status, audienceSlug)
  }, [artistId, postId, togglePostState, audienceSlug])

  // HANDLE HOVER FOR TEASER
  const isTeaserActive = audienceSlug === 'earn' && isFeatureEnabled

  // HANDLE CLICK TO SHOW TEASER
  const WrapperTag = isTeaserActive ? 'button' : 'div'
  const openConversionsInterestPanel = useShowConversionsInterest()

  return (
    <WrapperTag
      className={[
        'relative w-full',
        'flex justify-between items-center',
        'rounded-dialogue bg-grey-1',
        isTeaserActive ? 'cursor-pointer' : null,
        className,
      ].join(' ')}
      aria-label={isTeaserActive ? 'What is this?' : null}
      onClick={isTeaserActive ? openConversionsInterestPanel : null}
    >
      <div className="mb-0 flex items-center">
        {/* DOT */}
        <div
          className={[
            'w-4 h-4 rounded-full',
            disabled ? 'opacity-50' : 'opacity-100',
          ].join(' ')}
          style={{
            background: audienceSlug === 'growth' ? growthGradient : earnGradient,
          }}
        />
        {/* TITLE */}
        <strong
          className="capitalize ml-4"
          style={{ transform: 'translate(-1px, 0px)' }}
        >
          {audienceSlug === 'growth' ? 'Grow & Nurture' : 'Earn'}
        </strong>
        {/* RUNNING LABEL */}
        {isActive && (
          <PostCardLabel
            copy="running"
            className="font-bold"
            style={{
              background: audienceSlug === 'growth' ? growthGradient : earnGradient,
            }}
          />
        )}
      </div>
      {/* TOGGLE SWITCH or LIGHTBULB ICON */}
      <div>
        {isTeaserActive ? (
          <PostCardToggleTeaser />
        ) : (
          <ToggleSwitch
            state={currentState}
            onChange={onChange}
            isLoading={isLoading}
            disabled={disabled}
          />
        )}
      </div>
    </WrapperTag>
  )
}

PostCardToggle.propTypes = {
  audienceSlug: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  artistId: PropTypes.string.isRequired,
  isEnabled: PropTypes.bool.isRequired,
  togglePostState: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  isFeatureEnabled: PropTypes.bool,
  className: PropTypes.string,
}

PostCardToggle.defaultProps = {
  disabled: false,
  className: null,
  isFeatureEnabled: false,
}

export default PostCardToggle
