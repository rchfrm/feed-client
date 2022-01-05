import React from 'react'
import PropTypes from 'prop-types'

import ButtonPill from '@/elements/ButtonPill'

const PostsFilterOptionsItem = ({ title, type, value, setFilters }) => {
  const [isActive, setIsActive] = React.useState(false)

  const onClick = () => {
    setIsActive(!isActive)
    setFilters({
      type: !isActive ? 'add-filter' : 'remove-filter',
      payload: {
        filterType: type,
        filterValue: value,
      },
    })
  }

  return (
    <ButtonPill
      version="small"
      onClick={onClick}
      className={[
        'h-8 py-0 px-4',
        'mr-2',
        isActive ? 'bg-black' : null,
      ].join(' ')}
      active={isActive}
      trackComponentName="PostsFiltersOptionsItem"
    >
      {title}
    </ButtonPill>
  )
}

PostsFilterOptionsItem.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setFilters: PropTypes.func.isRequired,
}

PostsFilterOptionsItem.defaultProps = {
}

export default PostsFilterOptionsItem
