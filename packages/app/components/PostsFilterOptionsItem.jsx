import React from 'react'
import PropTypes from 'prop-types'

import ButtonPill from '@/elements/ButtonPill'

const PostsFilterOptionsItem = ({
  title,
  value,
  filters,
  filterType,
  addFilter,
  removeFilter,
  setFiltersState,
}) => {
  const [isActive, setIsActive] = React.useState(false)

  React.useEffect(() => {
    setIsActive(filters.includes(value))
  }, [filters, value])

  const onClick = () => {
    const filterAction = !isActive ? addFilter : removeFilter
    filterAction(value)
    setIsActive(!isActive)

    setFiltersState({
      type: !isActive ? 'add-filter' : 'remove-filter',
      payload: {
        filterType: filterType.slug,
        filterValue: value,
      },
    })
  }

  return (
    <ButtonPill
      version="small"
      onClick={onClick}
      className={[
        'h-8 py-0 px-2 xs:px-4',
        'mb-2 mr-2',
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
  value: PropTypes.string.isRequired,
  filters: PropTypes.array.isRequired,
  filterType: PropTypes.object.isRequired,
  addFilter: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired,
  setFiltersState: PropTypes.func.isRequired,
}

PostsFilterOptionsItem.defaultProps = {
}

export default PostsFilterOptionsItem
