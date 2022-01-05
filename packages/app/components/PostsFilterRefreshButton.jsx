import React from 'react'

import RefreshIcon from '@/icons/RefreshIcon'
import Button from '@/elements/Button'

import brandColors from '@/constants/brandColors'

const PostsFilterRefreshButton = () => {
  const onClick = () => {
    console.log('refresh')
  }

  return (
    <Button
      version="small icon"
      onClick={onClick}
      className="absolute h-auto top-0 z-20"
      style={{ top: '12px', right: '12px' }}
    >
      <RefreshIcon
        className={['w-4 h-auto mr-4'].join(' ')}
        fill={brandColors.textColor}
      />
    </Button>
  )
}

PostsFilterRefreshButton.propTypes = {
}

PostsFilterRefreshButton.defaultProps = {
}

export default PostsFilterRefreshButton
