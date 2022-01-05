import React from 'react'
import PropTypes from 'prop-types'

import PostsFilterLabel from '@/app/PostsFilterLabel'
import PostsFilterOptions from '@/app/PostsFilterOptions'
import PostsFilterRefreshButton from '@/app/PostsFilterRefreshButton'

import ArrowIcon from '@/icons/ArrowIcon'

const PostsFilter = ({ name }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const onClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={[
      'relative mb-5',
      'transition-height ease-in-out duration-200',
      isOpen ? 'h-23' : 'h-10',
    ].join(' ')}
    >
      <button
        onClick={onClick}
        className={[
          'relative z-10',
          'flex justify-between items-center',
          'w-full h-10',
          'px-4 py-2',
          'bg-grey-2 rounded-button font-bold',
        ].join(' ')}
      >
        <PostsFilterLabel name={name} />
        <div className={[
          'transition-transform duration-100 transform origin-center',
          isOpen ? 'rotate-90' : null,
        ].join(' ')}
        >
          <ArrowIcon
            className="w-3 h-3"
            direction="right"
          />
        </div>
      </button>
      <PostsFilterRefreshButton />
      <PostsFilterOptions />
    </div>
  )
}

PostsFilter.propTypes = {
  name: PropTypes.string.isRequired,
}

PostsFilter.defaultProps = {
}

export default PostsFilter
