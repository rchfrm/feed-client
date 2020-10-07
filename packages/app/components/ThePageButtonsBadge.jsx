import React from 'react'

const ThePageButtonsBadge = () => {
  return (
    <div
      className={[
        'absolute',
        'w-2 h-2',
        'bg-red rounded-full',
      ].join(' ')}
      style={{
        top: '-0.3rem',
        right: '0.3rem',
      }}
    />
  )
}

export default React.memo(ThePageButtonsBadge)
