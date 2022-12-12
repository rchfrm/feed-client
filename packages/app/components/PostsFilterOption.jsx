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
        'mr-2 last:mr-0 py-1 px-2',
        'rounded-dialogue border border-solid border-grey-2',
        'hover:bg-black hover:text-white',
        isActive ? 'bg-black text-white font-bold' : 'text-grey-3 bg-white',
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
