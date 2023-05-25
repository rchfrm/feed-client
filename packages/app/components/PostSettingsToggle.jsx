import React from 'react'
import PropTypes from 'prop-types'
import PostToggle from '@/app/PostToggle'

const PostSettingsToggle = ({
  post,
  status,
  campaignType,
  setPosts,
  updatePost,
  sortBy,
  isEnabled,
  setIsEnabled,
  isDisabled,
  isLastPromotableNotRunPost,
  setStatusToRefresh,
}) => {
  return (
    <div
      className={[
        'flex flex-column',
        'w-full',
        'sm:w-1/3',
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
          'mb-8',
          'sm:mb-10',
        ].join(' ')}
      >
        <PostToggle
          status={status}
          campaignType={campaignType}
          post={post}
          setPost={updatePost}
          setPosts={setPosts}
          sortBy={sortBy}
          isEnabled={isEnabled}
          setIsEnabled={setIsEnabled}
          isLastPromotableNotRunPost={isLastPromotableNotRunPost}
          setStatusToRefresh={setStatusToRefresh}
          isDisabled={isDisabled}
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
  status: PropTypes.string.isRequired,
  campaignType: PropTypes.string.isRequired,
  setPosts: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
  sortBy: PropTypes.array.isRequired,
  isEnabled: PropTypes.bool.isRequired,
  setIsEnabled: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  isLastPromotableNotRunPost: PropTypes.bool.isRequired,
  setStatusToRefresh: PropTypes.func.isRequired,
}

export default PostSettingsToggle
