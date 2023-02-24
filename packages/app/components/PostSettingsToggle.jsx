import React from 'react'
import PropTypes from 'prop-types'
import PostToggle from '@/app/PostToggle'

const PostSettingsToggle = ({
  post,
  campaignType,
  updatePost,
  isEnabled,
  setIsEnabled,
  isDisabled,
  className,
  isDesktopLayout,
}) => {
  return (
    <div
      className={[
        'flex flex-column',
        'w-full',
        'sm:w-1/2',
      ].join(' ')}
    >
      <h3 className={[
        isDisabled ? 'text-grey' : null,
        'font-bold text-lg',
      ].join(' ')}
      >
        Promotion
      </h3>
      <div
        className={[
          'flex items-center',
          'mb-5',
          'sm:mb-10',
        ].join(' ')}
      >
        <PostToggle
          campaignType={campaignType}
          post={post}
          setPost={updatePost}
          isEnabled={isEnabled}
          setIsEnabled={setIsEnabled}
          className="ml-5 sm:ml-0 mr-4"
        />
        <p
          className={[
            'mb-0',
            isDisabled ? 'text-grey' : null,
          ].join(' ')}
        >
          {isEnabled ? 'Enabled' : 'Disabled'}
        </p>
      </div>
    </div>
  )
}

PostSettingsToggle.propTypes = {
  post: PropTypes.object.isRequired,
  campaignType: PropTypes.string.isRequired,
  updatePost: PropTypes.func.isRequired,
  isEnabled: PropTypes.bool.isRequired,
  setIsEnabled: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  className: PropTypes.string,
  isDesktopLayout: PropTypes.bool,
}

PostSettingsToggle.defaultProps = {
  className: null,
  isDesktopLayout: false,
}

export default PostSettingsToggle
