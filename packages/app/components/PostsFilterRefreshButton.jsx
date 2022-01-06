import React from 'react'
import PropTypes from 'prop-types'

import RefreshIcon from '@/icons/RefreshIcon'
import Button from '@/elements/Button'

import brandColors from '@/constants/brandColors'

const PostsFilterRefreshButton = ({ filterType, setFilters }) => {
  const onClick = () => {
    setFilters({
      type: 'reset-filters',
      payload: {
        filterType,
      },
    })
  }

  return (
    <Button
      version="small icon"
      onClick={onClick}
      className="absolute h-auto top-0 z-20"
      style={{ top: '12px', right: '12px' }}
      trackComponentName="PostsFilterRefreshButton"
    >
      <RefreshIcon
        className={['w-4 h-auto mr-4'].join(' ')}
        fill={brandColors.textColor}
      />
    </Button>
  )
}

PostsFilterRefreshButton.propTypes = {
  filterType: PropTypes.string.isRequired,
  setFilters: PropTypes.func.isRequired,
}

PostsFilterRefreshButton.defaultProps = {
}

export default PostsFilterRefreshButton
