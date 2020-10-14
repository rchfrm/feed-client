import React from 'react'
import PropTypes from 'prop-types'

import LinkIcon from '@/icons/LinkIcon'
import PencilIcon from '@/icons/PencilIcon'

import brandColors from '@/constants/brandColors'

// import PostsDefaultLinkSelector from '@/app/PostsDefaultLinkSelector'

const PostsSettingsDefaultLink = ({
  defaultLink,
  setDefaultLink,
  className,
}) => {
  return (
    <div
      className={[
        'pr-3 block',
        className,
      ].join(' ')}
    >
      <button
        className={[
          'relative',
          'inline-block max-w-full',
          'p-3',
          'rounded-button border-black border-solid border-2',
        ].join(' ')}
        aria-label="Edit default link"
        onClick={() => {}}
      >
        <p className={[
          'flex items-baseline',
          'mb-0',
        ].join(' ')}
        >
          <span className="w-4 mr-3" style={{ transform: 'translateY(-0.1rem)' }}>
            <LinkIcon className="w-full h-auto" />
          </span>
          <span className="truncate">{defaultLink.name}</span>
        </p>
        <div
          className={[
            'absolute top-0 right-0 -mt-5 -mr-6',
            'flex items-center justify-center',
            'bg-green rounded-full w-10 h-10',
          ].join(' ')}
        >
          <PencilIcon className="w-5 h-auto" fill={brandColors.bgColor} />
        </div>
      </button>
    </div>
  )
}

PostsSettingsDefaultLink.propTypes = {
  defaultLink: PropTypes.object.isRequired,
  setDefaultLink: PropTypes.func.isRequired,
  className: PropTypes.string,
}

PostsSettingsDefaultLink.defaultProps = {
  className: null,
}


export default PostsSettingsDefaultLink
