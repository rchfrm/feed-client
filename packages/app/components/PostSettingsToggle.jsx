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
}) => {
  return (
    <div className="flex flex-column w-1/2">
      <h3 className={[
        isDisabled ? 'text-grey-2' : null,
        'font-bold text-lg',
      ].join(' ')}
      >
        Promotion
      </h3>
      <div
        className={[
          'flex items-center',
          'mb-10',
          className,
        ].join(' ')}
      >
        <PostToggle
          campaignType={campaignType}
          post={post}
          setPost={updatePost}
          isEnabled={isEnabled}
          setIsEnabled={setIsEnabled}
          className="mr-4"
        />
        <p
          className={[
            'mb-0',
            isDisabled ? 'text-grey-2' : null,
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
  isDisabled: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

PostSettingsToggle.defaultProps = {
  className: null,
}

export default PostSettingsToggle
