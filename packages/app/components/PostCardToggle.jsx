import React from 'react'
import PropTypes from 'prop-types'

import ToggleSwitch from '@/elements/ToggleSwitch'

import * as postsHelpers from '@/app/helpers/postsHelpers'

import brandColors from '@/constants/brandColors'

// CALL TO CHANGE STATE
const runChangeState = ({ artistId, postId, promotionEnabled }) => {
  return postsHelpers.updatePost({ artistId, postId, promotionEnabled })
}

// GROWTH GRADIENT
const growthGradient = `linear-gradient(135deg, ${brandColors.blue} 0%, ${brandColors.yellow} 100%)`

const PostCardToggle = ({
  audienceSlug,
  postId,
  artistId,
  promotionEnabled,
  togglePromotion,
  isActive,
  disabled,
  className,
}) => {
  // Store INTERNAL STATE based on promotionEnabled
  const [currentState, setCurrentState] = React.useState(promotionEnabled)
  // Update internal state when outside state changes
  React.useEffect(() => {
    setCurrentState(promotionEnabled)
  }, [promotionEnabled])

  // UPDATE ON SERVER
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
    <div
      className={[
        'relative',
        'flex justify-between',
        'rounded-dialogue bg-grey-1',
        className,
      ].join(' ')}
    >
      <div className="mb-0 flex items-center">
        {/* DOT */}
        <div
          className={[
            'w-4 h-4 rounded-full',
            audienceSlug !== 'growth' ? 'bg-red' : null,
            disabled ? 'opacity-50' : 'opacity-100',
          ].join(' ')}
          style={audienceSlug === 'growth' ? {
            background: growthGradient,
          } : null}
        />
        {/* TITLE */}
        <strong
          className="capitalize ml-4"
          style={{ transform: 'translate(-1px, 0px)' }}
        >
          {audienceSlug}
        </strong>
        {/* RUNNING LABEL */}
        {audienceSlug === 'growth' && isActive && (
          <p
            className="mb-0 ml-3 px-2 py-1 text-xs rounded-full"
            style={{
              padding: '0.1rem 0.4rem',
              background: growthGradient,
            }}
          >
            <strong>running</strong>
          </p>
        )}
      </div>
      {/* TOGGLE SWITCH */}
      <div>
        <ToggleSwitch
          state={currentState}
          onChange={onChange}
          isLoading={isLoading}
          disabled={disabled}
        />
      </div>
    </div>
  )
}

PostCardToggle.propTypes = {
  audienceSlug: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  artistId: PropTypes.string.isRequired,
  promotionEnabled: PropTypes.bool.isRequired,
  togglePromotion: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
}

PostCardToggle.defaultProps = {
  disabled: false,
  className: null,
}

export default PostCardToggle
