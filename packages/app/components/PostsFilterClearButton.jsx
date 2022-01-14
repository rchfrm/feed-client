import React from 'react'
import PropTypes from 'prop-types'

import TrashIcon from '@/icons/TrashIcon'
import Button from '@/elements/Button'

import brandColors from '@/constants/brandColors'

const PostsFilterRefreshButton = ({
  filterType,
  resetFilters,
  setFiltersState,
}) => {
  const onClick = () => {
    resetFilters()

    setFiltersState({
      type: 'reset-filters',
      payload: {
        filterType: filterType.slug,
      },
    })
  }

  return (
    <Button
      version="small icon"
      onClick={onClick}
      className="absolute h-auto top-0 z-20 px-0"
      style={{ top: '12px', right: '32px' }}
      trackComponentName="PostsFilterRefreshButton"
    >
      <TrashIcon
        className={['w-4 h-auto mr-4'].join(' ')}
        fill={brandColors.textColor}
      />
    </Button>
  )
}

PostsFilterRefreshButton.propTypes = {
  filterType: PropTypes.object.isRequired,
  resetFilters: PropTypes.func.isRequired,
  setFiltersState: PropTypes.func.isRequired,
}

PostsFilterRefreshButton.defaultProps = {
}

export default PostsFilterRefreshButton
