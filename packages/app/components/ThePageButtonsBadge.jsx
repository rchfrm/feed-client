import React from 'react'

import styles from '@/app/ThePageButtons.module.css'

const ThePageButtonsBadge = () => {
  return (
    <div
      className={[
        'absolute',
        'w-2 h-2',
        'bg-red rounded-full',
        styles.buttonBadge,
      ].join(' ')}
    />
  )
}

export default React.memo(ThePageButtonsBadge)
