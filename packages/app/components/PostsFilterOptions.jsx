import React from 'react'

import ButtonPill from '@/elements/ButtonPill'

const PostsFilterOptions = () => {
  const [isActive, setIsActive] = React.useState(false)

  const onClick = () => {
    setIsActive(!isActive)
  }

  return (
    <div className={[
      'absolute bottom-0',
      'px-4 py-2',
    ].join(' ')}
    >
      <ButtonPill
        version="small"
        onClick={onClick}
        className={[
          'h-8 py-0 px-4',
          isActive ? 'bg-black' : null,
        ].join(' ')}
        active={isActive}
        trackComponentName="PostsFiltersOptionsItem"
      >
        Running
      </ButtonPill>
    </div>
  )
}

PostsFilterOptions.propTypes = {
}

PostsFilterOptions.defaultProps = {
}

export default PostsFilterOptions
