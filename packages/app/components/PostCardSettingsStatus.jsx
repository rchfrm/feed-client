import React from 'react'
import PropTypes from 'prop-types'

const PostCardSettingsStatus = ({
  post,
}) => {
  console.log(post)

  return (
    <div className="flex flex-column w-1/2">
      <h3 className="font-bold text-lg">Status</h3>
      <div
        className={[
          'flex items-center',
          'h-8 mb-10',
        ].join(' ')}
      >
        <p className="font-bold mb-0">Running</p>
      </div>
    </div>
  )
}

PostCardSettingsStatus.propTypes = {
  post: PropTypes.object.isRequired,
}

PostCardSettingsStatus.defaultProps = {
}

export default PostCardSettingsStatus
