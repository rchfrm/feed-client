import React from 'react'
import PropTypes from 'prop-types'
import { growthGradient, conversionsGradient } from '@/app/helpers/postsHelpers'

const PostContentLabel = ({
  copy,
  campaignType,
  className,
  style,
}) => {
  return (
    <span
      className={[
        'mb-0 ml-3 px-2 py-1 text-xs rounded-full',
        className,
      ].join(' ')}
      style={{
        ...style,
        background: campaignType !== 'conversions' ? growthGradient : conversionsGradient,
        padding: '0.1rem 0.4rem',
      }}
    >
      {copy}
    </span>
  )
}

PostContentLabel.propTypes = {
  copy: PropTypes.string.isRequired,
  campaignType: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

PostContentLabel.defaultProps = {
  campaignType: 'all',
  className: null,
  style: {},
}

export default React.memo(PostContentLabel)
