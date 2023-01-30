import React from 'react'
import PropTypes from 'prop-types'
import produce from 'immer'

const PostsFilterOption = ({
  title,
  type,
  slug,
  setFilterBy,
  filterBy,
}) => {
  const [isActive, setIsActive] = React.useState(false)

  const handleClick = (type, slug) => {
    const newFilterBy = produce(filterBy, (draftState) => {
      if (slug === 'all') {
        delete draftState[type]
        return
      }
      draftState[type] = slug
    })

    setFilterBy(newFilterBy)
  }

  React.useEffect(() => {
    setIsActive(filterBy[type] === slug || (slug === 'all' && ! filterBy[type]))
  }, [filterBy, slug, type])

  return (
    <button
      onClick={() => handleClick(type, slug)}
      className={[
        'mb-1 xxs:mb-0 mr-1 xxs:mr-2 last:mr-0 py-1 px-2',
        'rounded-dialogue border border-solid border-grey',
        'hover:bg-black hover:text-offwhite',
        isActive ? 'bg-black text-offwhite font-bold' : 'text-grey-dark bg-offwhite',
      ].join(' ')}
    >
      {title}
    </button>
  )
}

PostsFilterOption.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  filterBy: PropTypes.object.isRequired,
  setFilterBy: PropTypes.func.isRequired,
}

export default PostsFilterOption
