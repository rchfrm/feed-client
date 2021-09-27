import React from 'react'
import PropTypes from 'prop-types'

import useBreakpointTest from '@/hooks/useBreakpointTest'

const NoDataBlock = ({ className, children, sizeRatio }) => {
  const isDesktopLayout = useBreakpointTest('md')

  return (
    <div
      className={[
        className,
        'relative w-full h-full',
        'bg-grey-1',
      ].join(' ')}
      style={{ paddingBottom: isDesktopLayout ? `${sizeRatio * 100}%` : '50%' }}
    >
      <div className="absolute w-full h-full flex flex-column items-center justify-center">
        {children}
      </div>
    </div>
  )
}

NoDataBlock.propTypes = {
  className: PropTypes.string,
  sizeRatio: PropTypes.number,
}

NoDataBlock.defaultProps = {
  className: null,
  sizeRatio: 3 / 2,
}

export default NoDataBlock
