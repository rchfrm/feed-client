import React from 'react'
import PropTypes from 'prop-types'

import PostCardLabel from '@/app/PostCardLabel'

import ToggleSwitch from '@/elements/ToggleSwitch'
import PostCardToggleTeaser from '@/app/PostCardToggleTeaser'

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

  // HANDLE HOVER FOR TEASER
  const isTeaserActive = audienceSlug === 'conversion' && disabled
  const containerRef = React.useRef(null)
  const [teaserIconVisible, setTeaserIconVisible] = React.useState(false)
  const showTeaserIcon = () => setTeaserIconVisible(true)
  const hideTeaserIcon = () => setTeaserIconVisible(false)
  React.useEffect(() => {
    if (!isTeaserActive) return
    const { current: containerEl } = containerRef
    containerEl.addEventListener('mouseenter', showTeaserIcon)
    containerEl.addEventListener('mouseleave', hideTeaserIcon)
    return () => {
      containerEl.removeEventListener('mouseenter', showTeaserIcon)
      containerEl.removeEventListener('mouseleave', hideTeaserIcon)
    }
  // eslint-disable-next-line
  }, [])

  // HANDLE CLICK TO SHOW TEASER
  const WrapperTag = isTeaserActive ? 'button' : 'div'

  return (
    <WrapperTag
      className={[
        'relative w-full',
        'flex justify-between items-center',
        'rounded-dialogue bg-grey-1',
        isTeaserActive ? 'cursor-pointer' : null,
        className,
      ].join(' ')}
      ref={containerRef}
      aria-label={isTeaserActive ? 'What is this?' : null}
      onClick={isTeaserActive ? () => console.log('sdfs') : null}
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
          {audienceSlug === 'growth' ? 'Promotable' : 'Conversions'}
        </strong>
        {/* RUNNING LABEL */}
        {audienceSlug === 'growth' && isActive && (
          <PostCardLabel
            copy="running"
            className="font-bold"
            style={{
              background: growthGradient,
            }}
          />
        )}
      </div>
      {/* TOGGLE SWITCH */}
      <div className="relative">
        <ToggleSwitch
          state={currentState}
          onChange={onChange}
          isLoading={isLoading}
          disabled={disabled}
          style={teaserIconVisible ? { opacity: 0, pointerEvents: 'none' } : null}
        />
        {/* CONVERSION TEASER ICON */}
        {isTeaserActive && (
          <PostCardToggleTeaser
            className={[
              'absolute right-0 top-0',
              teaserIconVisible ? 'block' : 'hidden',
            ].join(' ')}
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
